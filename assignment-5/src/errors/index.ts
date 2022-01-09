import { CONSTANTS } from 'constant';

// =============================== Form Errors =============================== //

export const FORM_ERRORS = {
  word: {
    required: 'Please enter a word',
    maxLength: `Word can be upto ${CONSTANTS.maxUserWordInputLength} characters`,
    pattern: 'Invalid word entered, allowed characters are A-Z a-z (without spaces)',
    minLength: `Word should be at least ${CONSTANTS.minUserWordInputLength} characters long`,
  },
} as const;

export type FieldNameType = keyof typeof FORM_ERRORS;
export type FormErrorType = keyof typeof FORM_ERRORS[FieldNameType];
export type FormErrorMessageType = typeof FORM_ERRORS[FieldNameType][FormErrorType];

// =============================== API Errors =============================== //

export const API_ERRORS = {
  noResult: 'No rhyming words could be found, please try a different word',
  tryAgain: 'We are facing some technical issues at the moment. Please try again later.',
} as const;
