export default function parseExtraInfo(extraInfoString) {
  // Elimina las comillas dobles adicionales al principio y al final
  const cleanedExtraInfo = extraInfoString.slice(1, -1);

  // Reemplaza las barras invertidas de escape por barras invertidas
  const unescapedExtraInfo = cleanedExtraInfo.replace(/\\"/g, '"');

  // Parsea la cadena en un objeto JSON
  const extraInfoObject = JSON.parse(unescapedExtraInfo);

  return extraInfoObject;
}
