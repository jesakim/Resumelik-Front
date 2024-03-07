export interface FailureState {
    error: string;
    message: string;
    errorValidation: { [key: string]: string };
}