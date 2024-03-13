import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ProjectActions from '../actions/project.actions';
import { failureAction } from '../actions/failure.action';
import { ProjectService } from 'src/app/services/project/project.service';

@Injectable()
export class ProjectEffects {
  constructor(
    private actions$: Actions,
    private projectService: ProjectService // Inject your project service here
  ) {}

  addProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.addProject),
      mergeMap((action) =>
        this.projectService.createProject(action.project).pipe(
          map((response) => ProjectActions.projectAdded({ project: response.result })),
          catchError((error) => of(failureAction({ error: error.error.error, errorValidation: error.error.errorValidation})))
        )
      )
    )
  );

  updateProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.updateProject),
      mergeMap((action) =>
        this.projectService.updateProject(action.project).pipe(
          map((response) => ProjectActions.projectUpdated({ project: response.result })),
          catchError((error) => of(failureAction({ error: error.error.error, errorValidation: error.error.errorValidation})))
        )
      )
    )
  );

  deleteProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.deleteProject),
      mergeMap((action) =>
        this.projectService.deleteProject(action.id).pipe(
          map(() => ProjectActions.projectDeleted({ id: action.id })),
          catchError((error) => of(failureAction({ error: error.error.error, errorValidation: error.error.errorValidation})))
        )
      )
    )
  );
}
