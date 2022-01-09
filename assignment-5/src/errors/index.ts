export const ERRORS = {
  word: {
    required: 'Please enter a word',
    maxLength: 'Word can be upto 20 characters',
    minLength: 'Word should be at least 3 characters long',
    pattern: 'Invalid word entered, allowed characters are A-Z a-z (without spaces)',
  },
} as const;

export type FieldNameType = keyof typeof ERRORS;
export type ErrorType = keyof typeof ERRORS[FieldNameType];
export type ErrorMessageType = typeof ERRORS[FieldNameType][ErrorType];
