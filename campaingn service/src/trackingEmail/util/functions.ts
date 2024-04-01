export async function getQuantityEmailBySend(
  campaignFile: string,
): Promise<any> {
  const result = [];
  try {
    const response = await fetch(campaignFile);
    const csvData = await response.text();

    const dataCsv = csvData.split('\n');
    const keys = dataCsv[0].split(',');

    for (let i = 1; i < dataCsv.length - 1; i++) {
      const values = dataCsv[i].split(',');
      const obj = {};
      for (let j = 0; j < keys.length; j++) {
        obj[keys[j].replace(/['"]+/g, '').toLowerCase()] = values[j].replace(
          /['"]+/g,
          '',
        );
      }
      result.push(obj);
    }
  } catch (error) {
    console.error('Error:', error);
  }
  return result.length;
}
