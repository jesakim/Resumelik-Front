import { createAction, props } from "@ngrx/store";
import { Experience } from "../models/experience.model";

export const addExperience = createAction('[Experiences] Add Experience', props<{ experience: Experience }>());
export const experienceAdded = createAction('[Experiences] Experience Added', props<{ experience: Experience }>());

// update actions

export const updateExperience = createAction('[Experiences] Update Experience', props<{ experience: Experience }>());
export const experienceUpdated = createAction('[Experiences] Experience Updated', props<{ experience: Experience }>());

// delete actions

export const deleteExperience = createAction('[Experiences] Delete Experience', props<{ id: number }>());
export const experienceDeleted = createAction('[Experiences] Experience Deleted', props<{ id: number }>());