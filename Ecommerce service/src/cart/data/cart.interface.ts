interface Product {
  product_id: string;
  quantity: number;
  price: number;
  iva: number;
}

export interface CartInterface {
  products: Product[];
  shipping_price: number;
}
