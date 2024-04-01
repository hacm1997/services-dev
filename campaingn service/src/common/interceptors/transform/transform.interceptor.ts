import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JWTHelper } from '@beamar/microlib';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const request = context.switchToHttp().getRequest();
    try {
      // const tokenRequest = request.headers.cookie.split(';').find((cookies) => {
      //   return cookies.trim().startsWith('auth.usr=');
      // });

      // const tokenParts = tokenRequest.split('=');
      // const token = tokenParts[1];
      const token =
        'eyJhbGciOiJSUzUxMiJ9.eyJpYXQiOjE3MTE5ODE2MjksInN1YiI6IjMxNTk1NTI5NjEwIiwiY3VycmVudFRva2VuIjoiZXlKaGJHY2lPaUpTVXpVeE1pSjkuZXlKcFlYUWlPakUzTVRFNU9ERTJNamtzSW5OMVlpSTZJak14TlRrMU5USTVOakV3SWl3aVlYQndUbUZ0WlNJNklrZFBUVVZFU1NJc0luSnZiR1Z6SWpvaVcxVlRSVkpkSWl3aWRHVnVZVzUwU1dRaU9pSXhNRFV6TVRnME16STRJaXdpZFhObGNrVnRZV2xzSWpvaWFuVmhia0JyY25Vek5qQXVZMjl0SWl3aVpYaHdJam94TnpFeU1USTFOakk1ZlEuQlpPa0hNVzh5b0NIUG1RLVRFWW8zTXVYMTkwT2VVd0E2ZGFxVDlzVTg2N1VtLW5YUVdRcVJOc3gySXgwSHYxTEdXSG5NOXdheXk2R3RmTHFOOEg5VEtvZ2tQSHZ1bWNRaGUtUGxuSElfbHdsaDVfUmZNdTBjX2ZqYXBxVE5MSDd6RGo4VG12ZjY0VWMxWTRyT3RzLVZnaFZmTVJDeXRwM2JHWHVwRWVTTlZSZXoyT1dVcktZYjYyc3FUSS1zRzlMVExmWUFaU1lra0hrYURlWTdzRjdRLWJEdG9GWU8wTG9RMVFXbC1LUDYxR2VlZi03YTBPVXRwVkNiSmg3bTBIRVVmVVB0eS1mQ2NMeDhON1YxV0h2T2tzeE5wN3JoYU14SVlERVZYRmNVM1U0SUIydlZfTDV5X1NOWUV5WkE3cm1QMjVKMWpJSUJvRjQzSk9tdl9rY2Z3IiwiYXBwTmFtZSI6IkdPTUVESSIsInJvbGVzIjoiW1VTRVJdIiwidGVuYW50SWQiOiIxMDUzMTg0MzI4IiwidXNlckVtYWlsIjoianVhbkBrcnUzNjAuY29tIiwiZXhwIjoxNzE0NTczNjI5fQ.CZRtFgFjBZZ1nT9-3ErShvW30UxqO0wnXLPN_3m9wEZY1gJMN-nNrRMXJ1ZaRv6ICfvItDJ_3I18ZWOli4sHr77CN5HwEI_z5VioLdVj31ei0g7Os4gWy62KhgK_M9ouxPWOwLwg6coh6YgcQAi05aQRTdzRQWXlTgnOrgkA8lIpl9lN8WfSlZcQzZykNW6ha8OeT3gHDat4U_g0zv4Z4N7U2tMgLqDYpOK7CmovFL4bGxkQt8AR-gi6rCt60HSPeG1OvWgMKtK3M8UjA8gmhFfDvIVQpYBTV-O41K0EkDUXeC-FM-UFb5BC2yvDjocYb0k97wLIR0QTRFb1M3Z3qA';
      JWTHelper.parseCreztuJWT(token);
      return next.handle();
    } catch (error) {
      throw error;
    }
  }
}
