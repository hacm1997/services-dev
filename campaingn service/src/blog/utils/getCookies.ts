export default function getCookies(request: any) {
  if (request?.xsrfcookie) {
    const tenantID = request?.xsrfcookie.split('=');
    return tenantID[1];
  } else {
    return undefined;
  }
}
