import { AppState, ResumeState } from "./app.state";

export const initialState: AppState = {
    resumeState: {
        resumes: [],
    },
    failureState: {
        error: '',
        message: '',
        errorValidation: {},
    },
};