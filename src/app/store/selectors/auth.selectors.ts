import { createSelector } from "@ngrx/store";
import { AppState } from "../states/app.state";

export const selectAuthStare = (state :AppState) => state.authState;

export const selectToken = createSelector(
    selectAuthStare,
    (state) => state.token
);

export const selectUser = createSelector(
    selectAuthStare,
    (state) => state.user
);

export const selectIsAuthenticated = createSelector(
    selectAuthStare,
    (state) => state.isAuthenticated
);
