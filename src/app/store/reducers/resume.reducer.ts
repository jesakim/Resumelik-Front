import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import * as ResumeActions from '../actions/resume.actions';
import * as ContactActions from '../actions/contact.actions';
import * as AddressActions from '../actions/address.actions';
import * as ExperienceActions from '../actions/experience.actions';
import * as EducationActions from '../actions/education.actions';
import * as SkillActions from '../actions/skill.actions';
import * as ProjectActions from '../actions/project.actions';
import * as CertificateActions from '../actions/certificate.actions';
import * as LanguageActions from '../actions/language.actions';
import * as HobbyActions from '../actions/hobby.actions';
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

    // Education actions

    on(EducationActions.educationAdded, (state, { education }) => ({ 
        ...state, 
        selectedResume:{
            ...state.selectedResume,
            educations: [...state.selectedResume.educations, education] 
        }
    })),

    on(EducationActions.educationUpdated, (state, { education }) => {
        const index = state.selectedResume.educations.findIndex(e => e.id === education.id);
        const updatedEducations = [...state.selectedResume.educations];
        updatedEducations[index] = education;
        return { 
            ...state, 
            selectedResume:{
                ...state.selectedResume,
                educations: updatedEducations 
            }
        };
    }),

    on(EducationActions.educationDeleted, (state, { id }) => ({ 
        ...state, 
        selectedResume:{
            ...state.selectedResume,
            educations: state.selectedResume.educations.filter(e => e.id !== id) 
        }
    })),

    // Skill actions

    on(SkillActions.skillAdded, (state, { skill }) => ({ 
        ...state, 
        selectedResume:{
            ...state.selectedResume,
            skills: [...state.selectedResume.skills, skill] 
        }
    })),
    on(SkillActions.skillUpdated, (state, { skill }) => {
        const index = state.selectedResume.skills.findIndex(s => s.id === skill.id);
        const updatedSkills = [...state.selectedResume.skills];
        updatedSkills[index] = skill;
        return { 
            ...state, 
            selectedResume:{
                ...state.selectedResume,
                skills: updatedSkills 
            }
        };
    }),
    on(SkillActions.skillDeleted, (state, { id }) => ({ 
        ...state, 
        selectedResume:{
            ...state.selectedResume,
            skills: state.selectedResume.skills.filter(s => s.id !== id) 
        }
    })),

    // Project actions

    on(ProjectActions.projectAdded, (state, { project }) => ({ 
        ...state, 
        selectedResume:{
            ...state.selectedResume,
            projects: [...state.selectedResume.projects, project] 
        }
    })),
    on(ProjectActions.projectUpdated, (state, { project }) => {
        const index = state.selectedResume.projects.findIndex(p => p.id === project.id);
        const updatedProjects = [...state.selectedResume.projects];
        updatedProjects[index] = project;
        return { 
            ...state, 
            selectedResume:{
                ...state.selectedResume,
                projects: updatedProjects 
            }
        };
    }),
    on(ProjectActions.projectDeleted, (state, { id }) => ({ 
        ...state, 
        selectedResume:{
            ...state.selectedResume,
            projects: state.selectedResume.projects.filter(p => p.id !== id) 
        }
    })),

    // Certificate actions

    on(CertificateActions.certificateAdded, (state, { certificate }) => ({ 
        ...state, 
        selectedResume:{
            ...state.selectedResume,
            certificates: [...state.selectedResume.certificates, certificate] 
        }
    })),
    on(CertificateActions.certificateUpdated, (state, { certificate }) => {
        const index = state.selectedResume.certificates.findIndex(c => c.id === certificate.id);
        const updatedCertificates = [...state.selectedResume.certificates];
        updatedCertificates[index] = certificate;
        return { 
            ...state, 
            selectedResume:{
                ...state.selectedResume,
                certificates: updatedCertificates 
            }
        };
    }),
    on(CertificateActions.certificateDeleted, (state, { id }) => ({ 
        ...state, 
        selectedResume:{
            ...state.selectedResume,
            certificates: state.selectedResume.certificates.filter(c => c.id !== id) 
        }
    })),

    // Language actions

    on(LanguageActions.languageAdded, (state, { language }) => ({ 
        ...state, 
        selectedResume:{
            ...state.selectedResume,
            languages: [...state.selectedResume.languages, language] 
        }
    })),
    on(LanguageActions.languageUpdated, (state, { language }) => {
        const index = state.selectedResume.languages.findIndex(l => l.id === language.id);
        const updatedLanguages = [...state.selectedResume.languages];
        updatedLanguages[index] = language;
        return { 
            ...state, 
            selectedResume:{
                ...state.selectedResume,
                languages: updatedLanguages 
            }
        };
    }),
    on(LanguageActions.languageDeleted, (state, { id }) => ({ 
        ...state, 
        selectedResume:{
            ...state.selectedResume,
            languages: state.selectedResume.languages.filter(l => l.id !== id) 
        }
    })),

    // Hobby actions

    on(HobbyActions.hobbyAdded, (state, { hobby }) => ({ 
        ...state, 
        selectedResume:{
            ...state.selectedResume,
            hobbies: [...state.selectedResume.hobbies, hobby] 
        }
    })),
    on(HobbyActions.hobbyUpdated, (state, { hobby }) => {
        const index = state.selectedResume.hobbies.findIndex(h => h.id === hobby.id);
        const updatedHobbies = [...state.selectedResume.hobbies];
        updatedHobbies[index] = hobby;
        return { 
            ...state, 
            selectedResume:{
                ...state.selectedResume,
                hobbies: updatedHobbies 
            }
        };
    }),
    on(HobbyActions.hobbyDeleted, (state, { id }) => ({ 
        ...state, 
        selectedResume:{
            ...state.selectedResume,
            hobbies: state.selectedResume.hobbies.filter(h => h.id !== id) 
        }
    }))


);