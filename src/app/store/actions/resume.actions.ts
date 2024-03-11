import { createAction, props } from '@ngrx/store';
import { Resume } from '../models/resume.model';
import { FullResume } from '../models/full-resume.model';

export const switchActiveTab = createAction('[Resumes] Switch Active Tab', (activeTab: string) => ({ activeTab }));


export const loadResumes = createAction('[Resumes] Load Resumes');
export const resumesLoaded = createAction('[Resumes] Resumes Loaded', props<{ resumes: Resume[] }>());

export const addResume = createAction('[Resumes] Add Resume', props<{ resume: Resume }>());
export const resumeAdded = createAction('[Resumes] Resume Added', props<{ resume: Resume }>());

export const loadResumeByName = createAction('[Resumes] Load Resume By Name', props<{ name: string }>());
export const resumeByNameLoaded = createAction('[Resumes] Resume By Name Loaded', props<{ resume: FullResume }>());

export const updateResume = createAction('[Resumes] Update Resume', props<{ resume: Resume }>());
export const resumeUpdated = createAction('[Resumes] Resume Updated', props<{ resume: Resume }>());

export const deleteResume = createAction('[Resumes] Delete Resume', props<{ id: number }>());
export const resumeDeleted = createAction('[Resumes] Resume Deleted', props<{ id: number }>());
