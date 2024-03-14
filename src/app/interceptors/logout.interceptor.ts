import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AppState } from '../store/states/app.state';
import { Store } from '@ngrx/store';
import { logout } from '../store/actions/auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class LogoutInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ){}

  private refreshCount = 0;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    return next.handle(request).pipe(
      
      catchError(error=> {
        
        
        if (error.status === 403) {
          console.log('403 error', error);
          
          localStorage.removeItem('token');
          this.store.dispatch(logout());
          this.router.navigate(['auth/login']);
        } else {
          return throwError(error);
        }
        return throwError(error);
      })
    );
  }
}
