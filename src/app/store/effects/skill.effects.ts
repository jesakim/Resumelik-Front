import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Skill } from "../models/skill.model";
import * as SkillActions from '../actions/skill.actions';
import { of } from "rxjs";
import { failureAction } from '../actions/failure.action';
import { SkillService } from "src/app/services/skill/skill.service";


@Injectable()
export class SkillEffect{
    constructor(
        private actions$: Actions,
        private skillService: SkillService
    ) {}

    // Add skill effect

    addSkill$ = createEffect(() => this.actions$.pipe(
        ofType(SkillActions.addSkill),
        mergeMap(action => this.skillService.createSkill(action.skill).pipe(
            map(response => SkillActions.skillAdded({ skill: response.result })),
            catchError(error => {
                console.error('Error adding skill', error.error); // Log the error
                return of(failureAction({ error: error.error.error, errorValidation: error.error.errorValidation}));
              })
            ))
    ));

    // Delete skill effect

    deleteSkill$ = createEffect(() => this.actions$.pipe(
        ofType(SkillActions.deleteSkill),
        mergeMap(action => this.skillService.deleteSkill(action.id).pipe(
            map(() => SkillActions.skillDeleted({ id: action.id })),
            catchError(error => {
                console.error('Error deleting skill', error.error); // Log the error
                return of(failureAction({ error: error.error.error, errorValidation: error.error.errorValidation}));
              })
            ))
    ));

    // Update skill effect

    updateSkill$ = createEffect(() => this.actions$.pipe(
        ofType(SkillActions.updateSkill),
        mergeMap(action => this.skillService.updateSkill(action.skill).pipe(
            map(response => SkillActions.skillUpdated({ skill: response.result })),
            catchError(error => {
                console.error('Error updating skill', error.error); // Log the error
                return of(failureAction({ error: error.error.error, errorValidation: error.error.errorValidation}));
              })
            ))
    ));
}
