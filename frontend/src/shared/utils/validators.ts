// Define types for validators
const VALIDATOR_TYPE_REQUIRE: string = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH: string = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH: string = 'MAXLENGTH';
const VALIDATOR_TYPE_NO_SPACE: string = 'NO_SPACE';
const VALIDATOR_TYPE_MIN: string = 'MIN';
const VALIDATOR_TYPE_MAX: string = 'MAX';
const VALIDATOR_TYPE_EMAIL: string = 'EMAIL';
const VALIDATOR_TYPE_FILE: string = 'FILE';

// Validator functions with explicit return types
export const VALIDATOR_REQUIRE = (): { type: string } => ({type: VALIDATOR_TYPE_REQUIRE});
export const VALIDATOR_FILE = (): { type: string } => ({type: VALIDATOR_TYPE_FILE});
export const VALIDATOR_MINLENGTH = (val: number): { type: string; val: number } => ({
    type: VALIDATOR_TYPE_MINLENGTH,
    val: val
});
export const VALIDATOR_MAXLENGTH = (val: number): { type: string; val: number } => ({
    type: VALIDATOR_TYPE_MAXLENGTH,
    val: val
});
export const VALIDATOR_MIN = (val: number): { type: string; val: number } => ({type: VALIDATOR_TYPE_MIN, val: val});
export const VALIDATOR_MAX = (val: number): { type: string; val: number } => ({type: VALIDATOR_TYPE_MAX, val: val});
export const VALIDATOR_EMAIL = (): { type: string } => ({type: VALIDATOR_TYPE_EMAIL});

export const VALIDATOR_NO_SPACE = (): { type: string } => ({type: VALIDATOR_TYPE_NO_SPACE});


// Define a type for the validator object
export type Validator = {
    type: string;
    val?: number;
};

// Update the validate function with type annotations
export const validate = (value: string, validators: Validator[]): boolean => {
    let isValid: boolean = true;
    for (const validator of validators) {
        if (validator.type === VALIDATOR_TYPE_REQUIRE) {
            isValid = isValid && value.trim().length > 0;
        }
        if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
            isValid = isValid && value.trim().length >= validator.val!;
        }
        if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
            isValid = isValid && value.trim().length <= validator.val!;
        }
        if (validator.type === VALIDATOR_TYPE_MIN) {
            isValid = isValid && +value >= validator.val!;
        }
        if (validator.type === VALIDATOR_TYPE_MAX) {
            isValid = isValid && +value <= validator.val!;
        }
        if (validator.type === VALIDATOR_TYPE_EMAIL) {
            isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
        }
        if (validator.type === VALIDATOR_TYPE_NO_SPACE) {
            isValid = isValid && !/\s/.test(value);
        }
    }
    return isValid;
};
