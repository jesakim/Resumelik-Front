import { FullResume } from "../models/full-resume.model";
import { Resume } from "../models/resume.model";

export interface ResumeState {
    selectedTab: string;
    resumes: Resume[];
    selectedResume: FullResume;
}