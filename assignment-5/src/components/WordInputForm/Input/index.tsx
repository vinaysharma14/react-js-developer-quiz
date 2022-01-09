import { FC, useMemo, HTMLProps } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { ERRORS, ErrorType, FieldNameType, ErrorMessageType } from 'errors';

import './styles.scss';

interface Props {
  error?: ErrorType;
  register: UseFormRegisterReturn;
}

export const Input: FC<Props & HTMLProps<HTMLInputElement>> = ({
  error,
  register,
  placeholder,
}) => {
  const errorMessage = useMemo((): ErrorMessageType | undefined => {
    if (error) {
      return ERRORS[register.name as FieldNameType][error];
    }

    return undefined;
  }, [error, register]);

  return (
    <>
      <input {...register} placeholder={placeholder} />

      {errorMessage && <p className='input-error'>{errorMessage}</p>}
    </>
  );
};
