import { createAction, props } from "@ngrx/store";
import { Contact } from "../models/contact.model";

export const addContact = createAction('[Contacts] Add Contact', props<{ contact: Contact }>());
export const contactAdded = createAction('[Contacts] Contact Added', props<{ contact: Contact }>());

// update actions

export const updateContact = createAction('[Contacts] Update Contact', props<{ contact: Contact }>());
export const contactUpdated = createAction('[Contacts] Contact Updated', props<{ contact: Contact }>());

// delete actions

export const deleteContact = createAction('[Contacts] Delete Contact', props<{ id: number }>());
export const contactDeleted = createAction('[Contacts] Contact Deleted', props<{ id: number }>());