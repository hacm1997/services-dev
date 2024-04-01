import { ProductModelData } from 'src/infrastructure/model/product/product.model.data';

export default async function transformData(productObject: any) {
  //console.log('items => ', itmes);
  try {
    const product: ProductModelData[] | undefined = productObject?.map(
      (item) => {
        return new ProductModelData(
          item.pid.S,
          item.sid.S,
          item.name.S,
          parseFloat(item.price.N),
          item.createdAt.S,
          item.status?.S,
          item.image?.S,
          item.description?.S,
          item.extraInfo?.S ? JSON.parse(item.extraInfo.S) : item.extraInfo,
          parseFloat(item.inventory?.N),
        );
      },
    );
    // console.log('result product transform => ', product);
    return product;
  } catch (error) {
    return null;
  }
}

export async function transformDataPaginate(productObject: any) {
  try {
    const product: ProductModelData[] | undefined = productObject?.map(
      (item: {
        pid: { S: string };
        sid: { S: string };
        name: { S: string };
        price: { N: string };
        createdAt: { S: string };
        status: { S: string };
        image: { S: string };
        description: { S: string };
        extraInfo: any;
        inventory?: { N: string | undefined };
      }) => {
        if (item.inventory) {
          return new ProductModelData(
            item.pid.S,
            item.sid.S,
            item.name.S,
            parseFloat(item.price.N),
            item.createdAt.S,
            item.status?.S,
            item.image?.S,
            item.description?.S,
            item.extraInfo?.S ? JSON.parse(item.extraInfo.S) : item.extraInfo,
            item.inventory.N ? Number(item.inventory.N) : undefined,
          );
        } else {
          return new ProductModelData(
            item.pid.S,
            item.sid.S,
            item.name.S,
            parseFloat(item.price.N),
            item.createdAt.S,
            item.status?.S,
            item.image?.S,
            item.description?.S,
            item.extraInfo?.S ? JSON.parse(item.extraInfo.S) : item.extraInfo,
          );
        }
      },
    );
    return product;
  } catch (error) {
    return null;
  }
}
