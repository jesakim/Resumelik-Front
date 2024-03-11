import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, tap, catchError, concatMap } from 'rxjs/operators';
import { ContactService } from "src/app/services/contact/contact.service";
import { Contact } from "../models/contact.model";
import * as ContactActions from "../actions/contact.actions";
import { of } from "rxjs";
import { failureAction } from '../actions/failure.action';


@Injectable()
export class ContactEffects {
    constructor(
        private actions$: Actions,
        private contactService:ContactService
    ) {}

    // add contact effect

    addContact$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ContactActions.addContact),
        concatMap((action) => this.contactService.createContact(action.contact).pipe(
            tap((response) => console.log('Added contact',response)),
            map(response => ContactActions.contactAdded({ contact: response.result as Contact})),
            catchError(error => {
                console.error('Error adding contact', error.error); // Log the error
                return of(failureAction({ error: error.error.error, errorValidation: error.error.errorValidation}));
              })
        ))
    ));

    // delete contact effect

    deleteContact$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ContactActions.deleteContact),
        concatMap((action) => this.contactService.deleteContact(action.id).pipe(
            tap((response) => console.log('Deleted contact',response)),
            map(response => ContactActions.contactDeleted({ id: action.id})),
            catchError(error => {
                console.error('Error deleting contact', error.error); // Log the error
                return of(failureAction({ error: error.error.error, errorValidation: error.error.errorValidation}));
              })
        ))
    ));

    // update contact effect

    updateContact$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ContactActions.updateContact),
        concatMap((action) => this.contactService.updateContact(action.contact).pipe(
            tap((response) => console.log('Updated contact',response)),
            map(response => ContactActions.contactUpdated({ contact: response.result as Contact})),
            catchError(error => {
                console.error('Error updating contact', error.error); // Log the error
                return of(failureAction({ error: error.error.error, errorValidation: error.error.errorValidation}));
              })
        ))
    ));


}