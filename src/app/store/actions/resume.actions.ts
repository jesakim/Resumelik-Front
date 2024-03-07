import { createAction, props } from '@ngrx/store';
import { Resume } from '../models/resume.model';


export const loadResumes = createAction('[Resumes] Load Resumes');
export const resumesLoaded = createAction('[Resumes] Resumes Loaded', props<{ resumes: Resume[] }>());

export const addResume = createAction('[Resumes] Add Resume', props<{ resume: Resume }>());
export const resumeAdded = createAction('[Resumes] Resume Added', props<{ resume: Resume }>());

export const loadResumeByName = createAction('[Resumes] Load Resume By Name', props<{ name: string }>());
export const resumeByNameLoaded = createAction('[Resumes] Resume By Name Loaded', props<{ resume: Resume }>());


