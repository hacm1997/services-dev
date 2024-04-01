"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportCustomersFunction = exports.importCustomersFunction = void 0;
const xlsx = require("xlsx");
async function importCustomersFunction(file) {
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData = xlsx.utils.sheet_to_json(sheet);
    const data = rawData.map((row) => {
        const customer = {
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
    if (data[0].sid !== undefined &&
        data[0].name !== undefined &&
        data[0].email !== undefined) {
        return data;
    }
    else {
        throw new Error('invalid template customers file');
    }
}
exports.importCustomersFunction = importCustomersFunction;
async function exportCustomersFunction(response, customers, tenantID) {
    const workbook = xlsx.utils.book_new();
    const customersData = customers.map((customer) => {
        const customerClone = { ...customer };
        delete customerClone.tenantID;
        delete customerClone.sid;
        delete customerClone.createdAt;
        delete customerClone.extraInfo;
        const reorderedCustomerClone = { id: customerClone.id };
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
    response.setHeader('Content-Disposition', `attachment; filename=${nameFile}.xlsx`);
    response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    response.send(excelBuffer);
}
exports.exportCustomersFunction = exportCustomersFunction;
//# sourceMappingURL=customerImportExport.js.map