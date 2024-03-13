import { createAction, props } from "@ngrx/store";
import { Education } from "../models/education.model";

export const addEducation = createAction('[Educations] Add Education', props<{ education: Education }>());
export const educationAdded = createAction('[Educations] Education Added', props<{ education: Education }>());

// update actions

export const updateEducation = createAction('[Educations] Update Education', props<{ education: Education }>());
export const educationUpdated = createAction('[Educations] Education Updated', props<{ education: Education }>());

// delete actions

export const deleteEducation = createAction('[Educations] Delete Education', props<{ id: number }>());
export const educationDeleted = createAction('[Educations] Education Deleted', props<{ id: number }>());