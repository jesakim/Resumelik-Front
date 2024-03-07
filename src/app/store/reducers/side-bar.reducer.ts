import { createReducer, on } from "@ngrx/store";
import { initialState } from "../states/initial.state";
import { switchSideBar } from "../actions/side-bar.action";


export const sideBarReducer = createReducer(
    initialState.selectedTab,
    on(switchSideBar, (state, { tab }) => tab),
);