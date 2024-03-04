import { createSelector, createFeatureSelector } from '@ngrx/store';

import {ResumeState } from '../states/app.state';

// Define a feature selector for the resume state slice
export const selectResumeState = createFeatureSelector<ResumeState>('resumeState');

// Define a selector to retrieve the resumes array from the resume state
export const selectResumes = createSelector(
  selectResumeState,
  (state: ResumeState) => state.resumes
);