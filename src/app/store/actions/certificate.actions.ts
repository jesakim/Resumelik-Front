import { createAction, props } from '@ngrx/store';
import { Certificate } from '../models/certificate.model';

// Add Certificate
export const addCertificate = createAction('[Certificates] Add Certificate', props<{ certificate: Certificate }>());
export const certificateAdded = createAction('[Certificates] Certificate Added', props<{ certificate: Certificate }>());

// Update Certificate
export const updateCertificate = createAction('[Certificates] Update Certificate', props<{ certificate: Certificate }>());
export const certificateUpdated = createAction('[Certificates] Certificate Updated', props<{ certificate: Certificate }>());

// Delete Certificate
export const deleteCertificate = createAction('[Certificates] Delete Certificate', props<{ id: number }>());
export const certificateDeleted = createAction('[Certificates] Certificate Deleted', props<{ id: number }>());
