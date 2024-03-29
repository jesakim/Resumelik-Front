import { Resume } from "../models/resume.model";
import { AuthState } from "./auth.state";
import { FailureState } from "./failure.state";
import { ResumeState } from "./resume.state";

export interface AppState {
    failureState: FailureState;
    resumeState: ResumeState;
    authState: AuthState;
}