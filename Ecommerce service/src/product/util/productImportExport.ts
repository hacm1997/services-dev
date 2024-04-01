import * as xlsx from 'xlsx';
import { Response } from 'express';
import { ProductInterface } from './product.interface';

export async function importProductsFunction(file: any) {
  const workbook = xlsx.read(file.buffer, { type: 'buffer' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rawData: any[] = xlsx.utils.sheet_to_json(sheet);

  const data: ProductInterface[] = rawData.map((row: any) => {
    const keywordsArray = row.keywords
      ? row.keywords.split(',').map((keyword: string) => keyword.trim())
      : [];
    const categoriesArray = row.categories
      ? row.categories.split(',').map((category: string) => category.trim())
      : [];
    const galleryArray = row.gallery
      ? row.gallery.split(',').map((gallery: string) => gallery.trim())
      : [];
    const product: ProductInterface = {
      sid: row.id,
      name: row.name,
      price: row.price ? row.price.toString() : '0',
      status: row.status ? row.status.toLowerCase() : 'created',
      image: row.image
        ? row.image
        : (process.env.APP_DEFAULT_IMAGE_URL as string),
      description: row.description,
      inventory: row.inventory ? row.inventory.toString() : '0',
      extraInfo: {
        ...Object.keys(row)
          .filter(
            (key) =>
              ![
                'sid',
                'name',
                'price',
                'status',
                'image',
                'description',
                'inventory',
                'discount_date_start',
                'discount_date_end',
                'discount_percent',
              ].includes(key),
          )
          .reduce((obj: any, key: string) => {
            obj[key] = row[key];
            return obj;
          }, {}),
        keywords: keywordsArray,
        categories: categoriesArray,
        gallery: galleryArray,
        have_inventory: Boolean(row.have_inventory),
        free_shipping: Boolean(row.free_shipping),
        isNew: Boolean(row.isNew),
        isBest: Boolean(row.isBest),
        available_shipping: Boolean(row.available_shipping),
        available_pickup: Boolean(row.available_pickup),
        discount: {
          date_start: row.discount_date_start,
          date_end: row.discount_date_end,
          percent: row.discount_percent,
        },
      },
      // inventory: !isNaN(row.inventory) ? row.inventory : 0,
    };
    return product;
  });
  if (
    data[0].name !== undefined &&
    data[0].price !== undefined &&
    data[0].description !== undefined &&
    data[0].inventory !== undefined
  ) {
    return data;
  } else {
    throw new Error('invalid template products file');
  }
}

export async function exportProductsFunction(
  response: Response,
  products: ProductInterface[],
  tenantID: string,
) {
  const workbook = xlsx.utils.book_new();

  const productsData = products.map((product) => {
    const productClone = { ...product };
    delete productClone.tenantID;
    productClone.id = productClone.id;
    delete productClone.sid;
    if (typeof productClone.extraInfo === 'string') {
      try {
        productClone.extraInfo = JSON.parse(productClone.extraInfo);
      } catch (error) {
        console.error('Error parsing extraInfo:', error);
      }
    }

    if (
      typeof productClone.extraInfo !== 'object' ||
      productClone.extraInfo === null
    ) {
      productClone.extraInfo = JSON.parse('{}');
    }

    if (productClone.extraInfo) {
      // Transformar arrays a strings separados por coma
      if (Array.isArray(productClone.extraInfo.categories)) {
        productClone.extraInfo.categories =
          productClone.extraInfo.categories.join(', ');
      }
      if (Array.isArray(productClone.extraInfo.keywords)) {
        productClone.extraInfo.keywords =
          productClone.extraInfo.keywords.join(', ');
      }
      if (Array.isArray(productClone.extraInfo.gallery)) {
        productClone.extraInfo.gallery =
          productClone.extraInfo.gallery.join(', ');
      }

      const { discount } = productClone.extraInfo;
      if (discount && typeof discount === 'object') {
        // Renombrar y agregar las propiedades del objeto discount
        productClone.discount_date_start = discount.date_start;
        productClone.discount_date_end = discount.date_end;
        productClone.discount_percent = discount.percent;
        productClone.free_shipping = Boolean(discount.free_shipping);
      }
      delete productClone.extraInfo.discount;
      // Fusionar extraInfo en productClone
      Object.assign(productClone, productClone.extraInfo);
      delete productClone.extraInfo;
    }
    Object.assign(productClone, productClone.extraInfo);
    delete productClone.extraInfo;
    const reorderedProductClone: any = { id: productClone.id };

    Object.keys(productClone).forEach((key) => {
      if (key !== 'id') {
        reorderedProductClone[key] = productClone[key];
      }
    });

    return reorderedProductClone;
  });
  const worksheet = xlsx.utils.json_to_sheet(productsData);
  const nameFile = `Products${tenantID}`;
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Products');

  const excelBuffer = xlsx.write(workbook, {
    type: 'buffer',
    bookType: 'xlsx',
  });

  response.setHeader(
    'Content-Disposition',
    `attachment; filename=${nameFile}.xlsx`,
  );
  response.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  );

  // Enviar el archivo como respuesta
  response.send(excelBuffer);
}
