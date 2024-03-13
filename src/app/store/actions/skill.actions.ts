import { createAction, props } from "@ngrx/store";
import { Skill } from "../models/skill.model";

export const addSkill = createAction('[Skills] Add Skill', props<{ skill: Skill }>());
export const skillAdded = createAction('[Skills] Skill Added', props<{ skill: Skill }>());

// Update actions
export const updateSkill = createAction('[Skills] Update Skill', props<{ skill: Skill }>());
export const skillUpdated = createAction('[Skills] Skill Updated', props<{ skill: Skill }>());

// Delete actions
export const deleteSkill = createAction('[Skills] Delete Skill', props<{ id: number }>());
export const skillDeleted = createAction('[Skills] Skill Deleted', props<{ id: number }>()); 
