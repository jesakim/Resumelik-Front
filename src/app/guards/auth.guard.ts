import { Injector, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/states/app.state';
import { selectIsAuthenticated } from '../store/selectors/auth.selectors';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const store : Store<AppState> = inject(Store<AppState>);
  const router : Router = inject(Router);
  return store.pipe(
    select(selectIsAuthenticated),
    tap(isAuthenticated => {      
      if (!isAuthenticated) {
        router.navigate(['auth/login']); // Redirect to login if not authenticated
      }
    })
  );
};
