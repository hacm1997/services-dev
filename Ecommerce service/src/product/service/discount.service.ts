import * as moment from 'moment';

export function detecteDiscountProducts(products: any) {
  // console.log('products in discount => ', products);
  const extraInfo = JSON.parse(products.extraInfo);
  // console.log('extraInfo => ', extraInfo);
  if (extraInfo && extraInfo.discount) {
    const { date_start, date_end, percent } = extraInfo.discount;

    const currentDate = moment().subtract(5, 'hours');
    const startDate = moment(date_start);
    const endDate = moment(date_end);
    if (currentDate.isBetween(startDate, endDate, 'minutes', '[]')) {
      // Aplicar descuento al precio
      const discountedPrice = products.price - (products.price * percent) / 100;
      return { ...products, price_discount: discountedPrice };
    }
  }

  return products;
}

export function detectSingleDiscountProducts(products: any) {
  // const extraInfo = JSON.parse(products.extraInfo);
  if (products && products.extraInfo) {
    const { date_start, date_end, percent } = products.extraInfo.discount;

    const currentDate = moment().subtract(5, 'hours');
    const startDate = moment(date_start);
    const endDate = moment(date_end);
    if (currentDate.isBetween(startDate, endDate, 'minutes', '[]')) {
      // Aplicar descuento al precio
      const discountedPrice = products.price - (products.price * percent) / 100;
      return { ...products, price_discount: discountedPrice };
    }
  }
  return products;
}
