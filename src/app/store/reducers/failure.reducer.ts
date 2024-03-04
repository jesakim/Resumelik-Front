import { createReducer, on } from "@ngrx/store";
import { initialState } from "../states/initial.state";
import { failureAction } from "../actions/failure.action";

export const failureReducer = createReducer(
    initialState.failureState,
    on(failureAction, (state, { error, errorValidation }) => ({ ...state, error: error, errorValidation: errorValidation })),
);