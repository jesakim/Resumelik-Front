// create side bar switch action

import { createAction } from "@ngrx/store";


export const switchSideBar = createAction('[SideBar] Switch SideBar', (tab: string) => ({ tab }));