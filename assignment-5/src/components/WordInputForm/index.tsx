import { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { ErrorType } from 'errors';

import { Input } from './Input';
import { Button } from './Button';

import './styles.scss';

type FormValues = {
  word: string;
};

export const WordInputForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

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

      <Button
        type='submit'
        text='Search Rhyming Words'
        onSubmit={handleSubmit(submitHandler)}
      />
    </form>
  );
};
