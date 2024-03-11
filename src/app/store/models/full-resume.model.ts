import { Address } from "./address.model";
import { Certificate } from "./certificate.model";
import { Contact } from "./contact.model";
import { Education } from "./education.model";
import { Experience } from "./experience.model";
import { Hobby } from "./hobby.model";
import { Language } from "./language.model";
import { Project } from "./project.model";
import { Skill } from "./skill.model";

export interface FullResume {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    picture: string;
    title: string;
    userId: number;
    addresses: Address[];
    certificates: Certificate[];
    contacts: Contact[];
    educations: Education[];
    experiences: Experience[];
    hobbies: Hobby[];
    languages: Language[];
    projects: Project[];
    skills: Skill[];
  }