# QUICK START
* npm i -> install dep.
* npm run start:local || npm run dev (local deploy)

###### Requirements
* Download and configure DynamoDB in Docker on Port 8000

## ENDPOINTS

# Must always be sent tenant for all requests from cookie as 'tenant=valueTenant'

## Products
##### Model:
  id: string;
  name: string;
  price: number;
  createdAt: Date;
  status: string;
  image?: string; (opcional)
  description?: string; (opcional)
  extraInfo?: JSON; (opcional)

#### CREATE (POST)
- {ulr}/product

#### GET (GET)
- {ulr}/product
- {ulr}/product/productID (by product id)
- {ulr}/product/search/params?{querys}
-- city
-- status
-- minPrice
-- maxPrice

#### UPDATE (PUT)
- {ulr}/product/
  -- product id from body

## CLIENT/CUSTOMER
#### Model
  id: string;
  name: string;
  last_name: string;
  email: string;
  phone: number;
  city: string;
  address: string;
  createdAt: Date;
  extraInfo?: JSON; (opcional)
  
 #### CREATE (POST)
- {ulr}/customer

#### GET (GET)
- {ulr}/customer
- {ulr}/customer/customerID (by customer id)

#### UPDATE (PUT)
- {ulr}/customer
 -- customer id on body

## INVOICE
##### Model:
  reference: string;
  createdAt: Date;
  customer_id: number;
  customer: CustomerInterface;
  products: ProductInterface[];
  shipping: ShippingInterface;
  iva: number;
  total: number;
  payment_method: string;
  status: string;
  extraInfo?: JSON;
  
 ##### ProductInterface:
  id: string;
  product_name?: string;
  amount?: number;
  price?: number;
  total_price?: number;
  details?: JSON;

 ##### ShippingInterface:
  id: string;
  product_name?: string;
  amount?: number;
  price?: number;
  total_price?: number;
  details?: JSON;
  
   #### CREATE (POST)
- {ulr}/invoice
 -- In customer send customer_id or send all data of customer if request recived CustomerInterface set de info else search by customer_id
 -- In shippign send the city of the sipping or send all data of shipping if request recived ShippingInterface set de info else search by customer_id

#### GET (GET)
- {ulr}/invoice/
- {ulr}/invoice/invoiceCode (by invoice code)

## SHIPPING
##### Model:
  city: string,
  price: number,
  neighborhood: string,
  postal_code: number

 #### CREATE (POST)
- {ulr}/shipping

#### GET (GET)
- {ulr}/shipping/
- {ulr}/shipping/ (by invoice code)

#### UPDATE (PUT)
- {ulr}/shipping/ (Send body as model)