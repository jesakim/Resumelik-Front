import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, tap, catchError, concatMap } from 'rxjs/operators';
import { Education } from "../models/education.model";
import * as EducationActions from '../actions/education.actions';
import { of } from "rxjs";
import { failureAction } from '../actions/failure.action';
import { EducationService } from "src/app/services/education/education.service";


@Injectable()
export class EducationEffect{

    constructor(
        private actions$: Actions,
        private educationService: EducationService
    ){}

    addEducation$ = createEffect(() =>
    this.actions$.pipe(
        ofType(EducationActions.addEducation),
        concatMap((action) => this.educationService.addEducation(action.education).pipe(
            tap((response) => console.log('Added education',response)),
            map(response => EducationActions.educationAdded({ education: response.result as Education})),
            catchError(error => {
                console.error('Error adding education', error.error); // Log the error
                return of(failureAction({ error: error.error.error, errorValidation: error.error.errorValidation}));
              })
        ))
    ));

    deleteEducation$ = createEffect(() =>
    this.actions$.pipe(
        ofType(EducationActions.deleteEducation),
        concatMap((action) => this.educationService.deleteEducation(action.id).pipe(
            tap((response) => console.log('Deleted education',response)),
            map(response => EducationActions.educationDeleted({ id: action.id})),
            catchError(error => {
                console.error('Error deleting education', error.error); // Log the error
                return of(failureAction({ error: error.error.error, errorValidation: error.error.errorValidation}));
              })
        ))
    ));

    updateEducation$ = createEffect(() =>
    this.actions$.pipe(
        ofType(EducationActions.updateEducation),
        concatMap((action) => this.educationService.updateEducation(action.education).pipe(
            tap((response) => console.log('Updated education',response)),
            map(response => EducationActions.educationUpdated({ education: response.result as Education})),
            catchError(error => {
                console.error('Error updating education', error.error); // Log the error
                return of(failureAction({ error: error.error.error, errorValidation: error.error.errorValidation}));
              })
        ))
    ));

}