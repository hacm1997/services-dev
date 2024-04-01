export default function getCookies(request: any) {
  const tenantID = request?.xsrfcookie.split('=');
  return tenantID[1];
}
