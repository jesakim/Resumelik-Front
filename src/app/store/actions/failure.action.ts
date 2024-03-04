import { createAction, props } from '@ngrx/store';

export const failureAction = createAction(
  '[Error] Failure',
  props<{ error: string; errorValidation: { [key: string]: string } }>()
);