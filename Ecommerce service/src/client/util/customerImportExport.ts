import { CustomerInterface } from './customer.interfaces';
import * as xlsx from 'xlsx';
import { Response } from 'express';

export async function importCustomersFunction(file: any) {
  const workbook = xlsx.read(file.buffer, { type: 'buffer' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rawData: any[] = xlsx.utils.sheet_to_json(sheet);
  const data: CustomerInterface[] = rawData.map((row: any) => {
    const customer: CustomerInterface = {
      sid: row.id.toString(),
      name: row.name,
      last_name: row.last_name ? row.last_name : '',
      email: row.email,
      phone: row.phone ? row.phone.toString() : '0',
      city: row.city ? row.city : '',
      address: row.address ? row.address : '',
      extraInfo: {},
    };
    return customer;
  });
  if (
    data[0].sid !== undefined &&
    data[0].name !== undefined &&
    data[0].email !== undefined
  ) {
    return data;
  } else {
    throw new Error('invalid template customers file');
  }
}

export async function exportCustomersFunction(
  response: Response,
  customers: CustomerInterface[],
  tenantID: string,
) {
  const workbook = xlsx.utils.book_new();
  const customersData = customers.map((customer) => {
    const customerClone = { ...customer };
    delete customerClone.tenantID;
    delete customerClone.sid;
    delete customerClone.createdAt;
    delete customerClone.extraInfo;

    const reorderedCustomerClone: any = { id: customerClone.id };
    Object.keys(customerClone).forEach((key) => {
      if (key !== 'id') {
        reorderedCustomerClone[key] = customerClone[key];
      }
    });
    return reorderedCustomerClone;
  });
  const worksheet = xlsx.utils.json_to_sheet(customersData);
  const nameFile = `Customers${tenantID}`;
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Customer');

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

  response.send(excelBuffer);
}
