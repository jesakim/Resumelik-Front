import { createAction, props } from '@ngrx/store';
import { Language } from '../models/language.model';

// Add Language
export const addLanguage = createAction('[Language] Add Language', props<{ language: Language }>());
export const languageAdded = createAction('[Language] Language Added', props<{ language: Language }>());

// Update Language
export const updateLanguage = createAction('[Language] Update Language', props<{ language: Language }>());
export const languageUpdated = createAction('[Language] Language Updated', props<{ language: Language }>());

// Delete Language
export const deleteLanguage = createAction('[Language] Delete Language', props<{ id: number }>());
export const languageDeleted = createAction('[Language] Language Deleted', props<{ id: number }>());
