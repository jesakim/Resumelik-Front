import { createAction, props } from '@ngrx/store';
import { Hobby } from '../models/hobby.model';

// Add Hobby
export const addHobby = createAction('[Hobby] Add Hobby', props<{ hobby: Hobby }>());
export const hobbyAdded = createAction('[Hobby] Hobby Added', props<{ hobby: Hobby }>());

// Update Hobby
export const updateHobby = createAction('[Hobby] Update Hobby', props<{ hobby: Hobby }>());
export const hobbyUpdated = createAction('[Hobby] Hobby Updated', props<{ hobby: Hobby }>());

// Delete Hobby
export const deleteHobby = createAction('[Hobby] Delete Hobby', props<{ id: number }>());
export const hobbyDeleted = createAction('[Hobby] Hobby Deleted', props<{ id: number }>());
