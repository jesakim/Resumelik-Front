import { User } from "../models/user.model";

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    token: string | null;
    }