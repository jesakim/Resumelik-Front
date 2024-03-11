import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import * as ResumeActions from '../actions/resume.actions';
import * as ContactActions from '../actions/contact.actions';
import * as AddressActions from '../actions/address.actions';
import * as ExperienceActions from '../actions/experience.actions';
import { initialState } from '../states/initial.state';
import { FullResume } from '../models/full-resume.model';


export const resumeReducer = createReducer(
    initialState.resumeState,
    on(ResumeActions.switchActiveTab, (state, { activeTab }) => ({ 
        ...state, 
        selectedTab: activeTab
    })),
    on(ResumeActions.resumesLoaded, (state, { resumes }) => ({ ...state, resumes: resumes })),
    on(ResumeActions.resumeAdded, (state, { resume }) => ({ ...state, resumes: [...state.resumes, resume] })),
    on(ResumeActions.resumeByNameLoaded, (state, { resume }) => ({ ...state, selectedResume: resume })),
    on(ResumeActions.resumeUpdated, (state, { resume }) => {
        const index = state.resumes.findIndex(r => r.id === resume.id);
        const updatedResumes = [...state.resumes];
        updatedResumes[index] = resume;
        return { ...state, resumes: updatedResumes, selectedResume: resume as FullResume };
    }),
    on(ResumeActions.resumeDeleted, (state, { id }) => ({ ...state, resumes: state.resumes.filter(r => r.id !== id) })),

    // Contact actions

    on(ContactActions.contactAdded, (state, { contact }) => ({ 
        ...state, 
        selectedResume:{
            ...state.selectedResume,
            contacts: [...state.selectedResume.contacts, contact] 
        }
    })),
    on(ContactActions.contactUpdated, (state, { contact }) => {
        const index = state.selectedResume.contacts.findIndex(c => c.id === contact.id);
        const updatedContacts = [...state.selectedResume.contacts];
        updatedContacts[index] = contact;
        return { 
            ...state, 
            selectedResume:{
                ...state.selectedResume,
                contacts: updatedContacts 
            }
        };
    }),
    on(ContactActions.contactDeleted, (state, { id }) => ({ 
        ...state, 
        selectedResume:{
            ...state.selectedResume,
            contacts: state.selectedResume.contacts.filter(c => c.id !== id) 
        }
    })),

    // Address actions

    on(AddressActions.addressAdded, (state, { address }) => ({ 
        ...state, 
        selectedResume:{
            ...state.selectedResume,
            addresses: [...state.selectedResume.addresses, address] 
        }
    })),
    on(AddressActions.addressUpdated, (state, { address }) => {
        const index = state.selectedResume.addresses.findIndex(a => a.id === address.id);
        const updatedAddresses = [...state.selectedResume.addresses];
        updatedAddresses[index] = address;
        return { 
            ...state, 
            selectedResume:{
                ...state.selectedResume,
                addresses: updatedAddresses 
            }
        };
    }),
    on(AddressActions.addressDeleted, (state, { id }) => ({ 
        ...state, 
        selectedResume:{
            ...state.selectedResume,
            addresses: state.selectedResume.addresses.filter(a => a.id !== id) 
        }
    })),

    // Experience actions

    on(ExperienceActions.experienceAdded, (state, { experience }) => ({ 
        ...state, 
        selectedResume:{
            ...state.selectedResume,
            experiences: [...state.selectedResume.experiences, experience] 
        }
    })),

    on(ExperienceActions.experienceUpdated, (state, { experience }) => {
        const index = state.selectedResume.experiences.findIndex(e => e.id === experience.id);
        const updatedExperiences = [...state.selectedResume.experiences];
        updatedExperiences[index] = experience;
        return { 
            ...state, 
            selectedResume:{
                ...state.selectedResume,
                experiences: updatedExperiences 
            }
        };
    }),

    on(ExperienceActions.experienceDeleted, (state, { id }) => ({ 
        ...state, 
        selectedResume:{
            ...state.selectedResume,
            experiences: state.selectedResume.experiences.filter(e => e.id !== id) 
        }
    })),

);