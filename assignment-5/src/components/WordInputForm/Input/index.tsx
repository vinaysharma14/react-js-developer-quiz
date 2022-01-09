import { FC, useMemo, HTMLProps } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FORM_ERRORS, FormErrorType, FieldNameType, FormErrorMessageType } from 'errors';

import './styles.scss';

interface Props {
  error?: FormErrorType;
  register: UseFormRegisterReturn;
}

export const Input: FC<Props & HTMLProps<HTMLInputElement>> = ({
  error,
  register,
  placeholder,
}) => {
  const errorMessage = useMemo((): FormErrorMessageType | undefined => {
    if (error) {
      return FORM_ERRORS[register.name as FieldNameType][error];
    }

    return undefined;
  }, [error, register]);

  return (
    <>
      <input
        {...register}
        placeholder={placeholder}
        className={errorMessage ? 'input-error-border' : ''}
      />

      <p className={`input-error-message ${errorMessage ? 'show' : ''}`}>{errorMessage}</p>
    </>
  );
};
