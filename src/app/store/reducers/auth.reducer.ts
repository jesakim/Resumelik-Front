import { createReducer, on } from "@ngrx/store";
import { initialState } from "../states/initial.state";
import * as AuthActions from '../actions/auth.actions';


export const authReducer = createReducer(
    initialState.authState,
    on(AuthActions.loginSuccess, (state, { user, token }) => ({
        ...state,
        user,
        isAuthenticated: true,
        token
    })),
    on(AuthActions.registerSuccess, (state, { user, token }) => ({
        ...state,
        user,
        isAuthenticated: true,
        token
    })),
    on(AuthActions.logout, state => ({
        ...state,
        user: null,
        isAuthenticated: false,
        token: null
    })),
    on(AuthActions.saveToken, (state, { token }) => ({
        ...state,
        token,
        isAuthenticated: true
    })),
    );