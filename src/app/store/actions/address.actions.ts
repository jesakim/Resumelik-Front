import { createAction, props } from "@ngrx/store";
import { Address } from "../models/address.model";

export const addAddress = createAction('[Addresses] Add Address', props<{ address: Address }>());
export const addressAdded = createAction('[Addresses] Address Added', props<{ address: Address }>());

// update actions

export const updateAddress = createAction('[Addresses] Update Address', props<{ address: Address }>());
export const addressUpdated = createAction('[Addresses] Address Updated', props<{ address: Address }>());

// delete actions

export const deleteAddress = createAction('[Addresses] Delete Address', props<{ id: number }>());
export const addressDeleted = createAction('[Addresses] Address Deleted', props<{ id: number }>());