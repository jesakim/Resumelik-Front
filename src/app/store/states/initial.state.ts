import { AppState } from "./app.state";

export const initialState: AppState = {
    selectedTab: 'overview',
    resumeState: {
        resumes: [],
        selectedResume: {
            id: 0,
            name: '',
            firstName: '',
            lastName: '',
            picture: '',
            title: '',
            userId: 0,
        },
    },
    failureState: {
        error: '',
        message: '',
        errorValidation: {},
    },
};