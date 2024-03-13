import { AppState } from "./app.state";

export const initialState: AppState = {
    resumeState: {
        selectedTab: 'overview',
        resumes: [],
        selectedResume: {
            id: 0,
            name: '',
            firstName: '',
            lastName: '',
            picture: '',
            title: '',
            userId: 0,
            addresses: [],
            certificates: [],
            contacts: [],
            educations: [],
            experiences: [],
            hobbies: [],
            languages: [],
            projects: [],
            skills: [],
        },
    },
    failureState: {
        error: '',
        message: '',
        errorValidation: {},
    },
    authState: {
        user: null,
        isAuthenticated: false,
        token: null,
    },
};