import { createAction, props } from '@ngrx/store';
import { Project } from '../models/project.model';

// Add Project
export const addProject = createAction('[Project] Add Project', props<{ project: Project }>());
export const projectAdded = createAction('[Project] Project Added', props<{ project: Project }>());

// Update Project
export const updateProject = createAction('[Project] Update Project', props<{ project: Project }>());
export const projectUpdated = createAction('[Project] Project Updated', props<{ project: Project }>());

// Delete Project
export const deleteProject = createAction('[Project] Delete Project', props<{ id: number }>());
export const projectDeleted = createAction('[Project] Project Deleted', props<{ id: number }>());
