import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, tap, catchError, concatMap } from 'rxjs/operators';
import { User } from "../models/user.model";
import * as AuthActions from '../actions/auth.actions';
import { of } from "rxjs";
import { failureAction } from '../actions/failure.action';
import { AuthService } from "src/app/services/auth/auth.service";


@Injectable()
export class AuthEffect{
    constructor(
        private actions$: Actions,
        private authService:AuthService
    ) {}

    // login effect

    login$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.login),
        mergeMap(action => this.authService.login(action.user).pipe(
            map(response => {
                localStorage.setItem('token', response.result.token);
                return AuthActions.loginSuccess({ user: response.result.user, token: response.result.token });
            }),
            catchError(error => {
                console.error('Error logging in', error.error); // Log the error
                return of(failureAction({ error: error.error.error, errorValidation: error.error.errorValidation}));
              })
            ))
    ));

    // register effect

    register$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.register),
        mergeMap(action => this.authService.register(action.user).pipe(
            map(response => {
                localStorage.setItem('token', response.result.token);
                return AuthActions.registerSuccess({ user: response.result.user, token: response.result.token });
            }),
            catchError(error => {
                console.error('Error registering', error.error); // Log the error
                return of(failureAction({ error: error.error.error, errorValidation: error.error.errorValidation}));
              })
            ))
    ));

    loadToken$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.loadToken),
        mergeMap(action => {
            const token = localStorage.getItem('token');
            if (token) {
                return of(AuthActions.saveToken({ token }));
            }
            return of(AuthActions.logout());
        })
    ));
}