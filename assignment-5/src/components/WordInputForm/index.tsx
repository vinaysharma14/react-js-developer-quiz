import { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';

import './styles.scss';
import { Input } from './Input';
import { ErrorType } from 'errors';

type FormValues = {
  word: string,
};

export const WordInputForm: FC = () => {
  const { register, handleSubmit, formState:{ errors } } = useForm<FormValues>();

  const submitHandler = useCallback((data: FormValues) => console.log(data.word), []);

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Input
        register={register('word', {
          required: true,
          minLength: 3,
          maxLength: 20,
          pattern: /^[a-zA-Z]+$/,
        })}
        placeholder='Enter your word here'
        error={errors.word?.type as ErrorType | undefined}
      />
    </form>
  );
};
