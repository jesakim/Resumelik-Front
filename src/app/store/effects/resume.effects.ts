import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, tap, concatMap, catchError } from 'rxjs/operators';
import * as ResumeActions from '../actions/resume.actions';
import { ResumeService } from 'src/app/services/resume/resume.service';
import { of } from 'rxjs';
import { failureAction } from '../actions/failure.action';

@Injectable()
export class ResumeEffects {
    constructor(
        private actions$: Actions,
        private resumeService:ResumeService
    ) {}

    loadResumes$ = createEffect(() => 
    this.actions$.pipe(
        ofType(ResumeActions.loadResumes),
        mergeMap(() => this.resumeService.getResumes().pipe(
            tap((response) => console.log('Fetched resume',response)),
            map(response => ResumeActions.resumesLoaded({ resumes: response.result})),
        ))
    ));

    getResumeByName$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ResumeActions.loadResumeByName),
        mergeMap((action) => this.resumeService.getResumeByName(action.name).pipe(
            tap((response) => console.log('Fetched resume',response)),
            map(response => ResumeActions.resumeByNameLoaded({ resume: response.result})),
            catchError(error => {
                console.error('Error fetching resume', error.error); // Log the error
                return of(failureAction({ error: error.error.error, errorValidation: error.error.errorValidation}));
              })
        ))
    ));

    addResume$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ResumeActions.addResume),
        concatMap((action) => this.resumeService.addResume(action.resume).pipe(
            tap((response) => console.log('Added resume',response)),
            map(response => ResumeActions.resumeAdded({ resume: response.result})),
            catchError(error => {
                console.error('Error adding resume', error.error); // Log the error
                return of(failureAction({ error: error.error.error, errorValidation: error.error.errorValidation}));
              })
        ))
    ));

    updateResume$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ResumeActions.updateResume),
        concatMap((action) => this.resumeService.updateResume(action.resume).pipe(
            tap((response) => console.log('Updated resume',response)),
            map(response => ResumeActions.resumeUpdated({ resume: response.result})),
            catchError(error => {
                console.error('Error updating resume', error.error); // Log the error
                return of(failureAction({ error: error.error.error, errorValidation: error.error.errorValidation}));
              })
        ))
    ));

    deleteResume$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ResumeActions.deleteResume),
        concatMap((action) => this.resumeService.deleteResume(action.id).pipe(
            tap((response) => console.log('Deleted resume',response)),
            map(response => ResumeActions.resumeDeleted({ id: action.id})),
            catchError(error => {
                console.error('Error deleting resume', error.error); // Log the error
                return of(failureAction({ error: error.error.error, errorValidation: error.error.errorValidation}));
              })
        ))
    ));

            
}