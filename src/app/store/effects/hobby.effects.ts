import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as HobbyActions from '../actions/hobby.actions';
import { failureAction } from '../actions/failure.action';
import { HobbyService } from 'src/app/services/hobby/hobby.service';

@Injectable()
export class HobbyEffects {
  constructor(
    private actions$: Actions,
    private hobbyService: HobbyService // Inject your hobby service here
  ) {}

  addHobby$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HobbyActions.addHobby),
      mergeMap((action) =>
        this.hobbyService.createHobby(action.hobby).pipe(
          map((response) => HobbyActions.hobbyAdded({ hobby: response.result })),
          catchError((error) => of(failureAction({ error: error.error, errorValidation: error.errorValidation })))
        )
      )
    )
  );

  updateHobby$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HobbyActions.updateHobby),
      mergeMap((action) =>
        this.hobbyService.updateHobby(action.hobby).pipe(
          map((response) => HobbyActions.hobbyUpdated({ hobby: response.result })),
          catchError((error) => of(failureAction({ error: error.error, errorValidation: error.errorValidation })))
        )
      )
    )
  );

  deleteHobby$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HobbyActions.deleteHobby),
      mergeMap((action) =>
        this.hobbyService.deleteHobby(action.id).pipe(
          map(() => HobbyActions.hobbyDeleted({ id: action.id })),
          catchError((error) => of(failureAction({ error: error.error, errorValidation: error.errorValidation })))
        )
      )
    )
  );
}
