import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const login = createAction(
    '[Auth] Login',
    props<{ user: User }>()
    );
export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ user: User,token:string }>()
    );

export const register = createAction(
    '[Auth] Register',
    props<{ user: User }>()
    );
export const registerSuccess = createAction(
    '[Auth] Register Success',
    props<{ user: User,token:string }>()
    );

export const logout = createAction(
    '[Auth] Logout'
    );


export const loadToken = createAction('[Auth] Load Token');
export const saveToken = createAction('[Auth] Save Token', props<{ token: string }>());
