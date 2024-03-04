import { Resume } from "../models/resume.model";

export interface AppState {
    failureState: FailureState;
    resumeState: ResumeState;
}

export interface ResumeState {
    resumes: Resume[];
}

export interface FailureState {
    error: string;
    message: string;
    errorValidation: { [key: string]: string };
}