import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CertificatesActions from '../actions/certificate.actions';
import { failureAction } from '../actions/failure.action';
import { CertificateService } from 'src/app/services/certificate/certificate.service';

@Injectable()
export class CertificateEffects {
  constructor(
    private actions$: Actions,
    private certificateService: CertificateService // Inject your certificate service here
  ) {}

  addCertificate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CertificatesActions.addCertificate),
      mergeMap((action) =>
        this.certificateService.createCertificate(action.certificate).pipe(
          map((response) => CertificatesActions.certificateAdded({ certificate: response.result })),
          catchError((error) => of(failureAction({ error: error.error.error, errorValidation: error.error.errorValidation})))
        )
      )
    )
  );

  updateCertificate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CertificatesActions.updateCertificate),
      mergeMap((action) =>
        this.certificateService.updateCertificate(action.certificate).pipe(
          map((response) => CertificatesActions.certificateUpdated({ certificate: response.result })),
          catchError((error) => of(failureAction({ error: error.error.error, errorValidation: error.error.errorValidation})))
        )
      )
    )
  );

  deleteCertificate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CertificatesActions.deleteCertificate),
      mergeMap((action) =>
        this.certificateService.deleteCertificate(action.id).pipe(
          map(() => CertificatesActions.certificateDeleted({ id: action.id })),
          catchError((error) => of(failureAction({ error: error.error.error, errorValidation: error.error.errorValidation})))
        )
      )
    )
  );
}
