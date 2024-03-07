import { Resume } from "../models/resume.model";
import { FailureState } from "./failure.state";
import { ResumeState } from "./resume.state";

export interface AppState {
    selectedTab: string;
    failureState: FailureState;
    resumeState: ResumeState;
}