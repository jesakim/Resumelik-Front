import { createReducer, on } from '@ngrx/store';
import * as ResumeActions from '../actions/resume.actions';
import { initialState } from '../states/initial.state';
import { failureAction } from '../actions/failure.action';

export const resumeReducer = createReducer(
    initialState.resumeState,
    on(ResumeActions.resumesLoaded, (state, { resumes }) => ({ ...state, resumes: resumes })),
    on(ResumeActions.resumeAdded, (state, { resume }) => ({ ...state, resumes: [...state.resumes, resume] })),
    on(ResumeActions.resumeByNameLoaded, (state, { resume }) => ({ ...state, selectedResume: resume })),
);