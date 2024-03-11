import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, tap, catchError, concatMap } from 'rxjs/operators';
import { Address } from "../models/address.model";
import * as AddressActions from '../actions/address.actions';
import { of } from "rxjs";
import { failureAction } from '../actions/failure.action';
import { AddressService } from "src/app/services/address/address.service";


@Injectable()
export class AddressEffect{
    constructor(
        private actions$: Actions,
        private addressService:AddressService
    ) {}

    // add address effect

    addAddress$ = createEffect(() => this.actions$.pipe(
        ofType(AddressActions.addAddress),
        mergeMap(action => this.addressService.createAddress(action.address).pipe(
            map(response => AddressActions.addressAdded({ address: response.result })),
            catchError(error => {
                console.error('Error adding address', error.error); // Log the error
                return of(failureAction({ error: error.error.error, errorValidation: error.error.errorValidation}));
              })
            ))
    ));

    // delete address effect

    deleteAddress$ = createEffect(() => this.actions$.pipe(
        ofType(AddressActions.deleteAddress),
        mergeMap(action => this.addressService.deleteAddress(action.id).pipe(
            map(response => AddressActions.addressDeleted({ id: action.id })),
            catchError(error => {
                console.error('Error deleting address', error.error); // Log the error
                return of(failureAction({ error: error.error.error, errorValidation: error.error.errorValidation}));
              })
            ))
    ));

    // update address effect

    updateAddress$ = createEffect(() => this.actions$.pipe(
        ofType(AddressActions.updateAddress),
        mergeMap(action => this.addressService.updateAddress(action.address).pipe(
            map(response => AddressActions.addressUpdated({ address: response.result })),
            catchError(error => {
                console.error('Error updating address', error.error); // Log the error
                return of(failureAction({ error: error.error.error, errorValidation: error.error.errorValidation}));
              })
            ))
    ));
}