import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
// import { AuthState } from '../auth/auth.state';
// import { selectToken } from '../auth/auth.selectors';
import { switchMap } from 'rxjs/operators';
import { AuthState } from '../store/states/auth.state';
import { AppState } from '../store/states/app.state';
import { selectToken } from '../store/selectors/auth.selectors';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes('/login') || req.url.includes('/register')) {
          return next.handle(req); // Don't add the bearer token for these routes
        }
        const authToken = localStorage.getItem('token');
        if (authToken) {
            const authReq = req.clone({
              setHeaders: {
              Authorization: `Bearer ${authToken}`
              }
            });
        return next.handle(authReq);
        } else {
        return next.handle(req);
        }
    }
}
