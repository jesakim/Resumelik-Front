import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, tap, catchError, concatMap } from 'rxjs/operators';
import { Experience } from "../models/experience.model";
import * as ExperienceActions from '../actions/experience.actions';
import { of } from "rxjs";
import { failureAction } from '../actions/failure.action';
import { ExperienceService } from "src/app/services/experience/experience.service";


@Injectable()
export class ExperienceEffect{

    constructor(
        private actions$: Actions,
        private experienceService: ExperienceService
    ){}

    addExperience$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ExperienceActions.addExperience),
        concatMap((action) => this.experienceService.createExperience(action.experience).pipe(
            tap((response) => console.log('Added experience',response)),
            map(response => ExperienceActions.experienceAdded({ experience: response.result as Experience})),
            catchError(error => {
                console.error('Error adding experience', error.error); // Log the error
                return of(failureAction({ error: error.error.error, errorValidation: error.error.errorValidation}));
              })
        ))
    ));

    deleteExperience$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ExperienceActions.deleteExperience),
        concatMap((action) => this.experienceService.deleteExperience(action.id).pipe(
            tap((response) => console.log('Deleted experience',response)),
            map(response => ExperienceActions.experienceDeleted({ id: action.id})),
            catchError(error => {
                console.error('Error deleting experience', error.error); // Log the error
                return of(failureAction({ error: error.error.error, errorValidation: error.error.errorValidation}));
              })
        ))
    ));

    updateExperience$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ExperienceActions.updateExperience),
        concatMap((action) => this.experienceService.updateExperience(action.experience).pipe(
            tap((response) => console.log('Updated experience',response)),
            map(response => ExperienceActions.experienceUpdated({ experience: response.result as Experience})),
            catchError(error => {
                console.error('Error updating experience', error.error); // Log the error
                return of(failureAction({ error: error.error.error, errorValidation: error.error.errorValidation}));
              })
        ))
    ));
}