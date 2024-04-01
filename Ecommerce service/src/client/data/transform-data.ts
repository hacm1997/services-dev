import { CustomerModelData } from 'src/infrastructure/model/customer/customer.model.data';

export default async function transformCustomerData(itmes: any) {
  try {
    const client: CustomerModelData[] | undefined = itmes?.map((item) => {
      return new CustomerModelData(
        item.pid.S,
        item.sid.S,
        item.name.S,
        item.last_name.S,
        item.email.S,
        parseFloat(item.phone.N),
        item.city?.S,
        item.address?.S,
        item.createdAt.S,
        item.extraInfo?.S ? JSON.parse(item.extraInfo.S) : item.extraInfo,
      );
    });
    return client;
  } catch (error) {
    return null;
  }
}

export async function transformCustomerDataPaginate(customerObject: any) {
  //console.log('items => ', itmes);
  try {
    const customer: CustomerModelData[] | undefined = customerObject?.map(
      (item: {
        pid: { S: string };
        sid: { S: string };
        name: { S: string };
        last_name: { S: string };
        email: { S: string };
        phone: { N: string };
        city: { S: string };
        address: { S: string };
        createdAt: { S: string };
        extraInfo: any;
      }) => {
        return new CustomerModelData(
          item.pid.S,
          item.sid.S,
          item.name.S,
          item.last_name.S,
          item.email.S,
          parseFloat(item.phone.N),
          item.city?.S,
          item.address?.S,
          item.createdAt.S,
          item.extraInfo?.S ? JSON.parse(item.extraInfo.S) : item.extraInfo,
        );
      },
    );
    return customer;
  } catch (error) {
    return null;
  }
}
