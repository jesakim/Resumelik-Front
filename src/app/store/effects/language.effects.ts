import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as LanguageActions from '../actions/language.actions';
import { failureAction } from '../actions/failure.action';
import { LanguageService } from 'src/app/services/language/language.service';

@Injectable()
export class LanguageEffects {
  constructor(
    private actions$: Actions,
    private languageService: LanguageService // Inject your language service here
  ) {}

  addLanguage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LanguageActions.addLanguage),
      mergeMap((action) =>
        this.languageService.createLanguage(action.language).pipe(
          map((response) => LanguageActions.languageAdded({ language: response.result })),
          catchError((error) => of(failureAction({ error: error.error, errorValidation: error.errorValidation })))
        )
      )
    )
  );

  updateLanguage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LanguageActions.updateLanguage),
      mergeMap((action) =>
        this.languageService.updateLanguage(action.language).pipe(
          map((response) => LanguageActions.languageUpdated({ language: response.result })),
          catchError((error) => of(failureAction({ error: error.error, errorValidation: error.errorValidation })))
        )
      )
    )
  );

  deleteLanguage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LanguageActions.deleteLanguage),
      mergeMap((action) =>
        this.languageService.deleteLanguage(action.id).pipe(
          map(() => LanguageActions.languageDeleted({ id: action.id })),
          catchError((error) => of(failureAction({ error: error.error, errorValidation: error.errorValidation })))
        )
      )
    )
  );
}
