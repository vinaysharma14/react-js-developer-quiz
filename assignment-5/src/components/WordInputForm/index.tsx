import { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'store';
import { FormErrorType } from 'errors';
import { fetchRhymingWords } from 'store/features';

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

  const dispatch = useDispatch();

  const { fetchingRhymingWords } = useSelector(
    ({ rhymingWordsReducer }: RootState) => rhymingWordsReducer,
  );

  const submitHandler = useCallback(
    ({ word }: FormValues) => dispatch(fetchRhymingWords(word)),
    [dispatch],
  );

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
        error={errors.word?.type as FormErrorType | undefined}
      />

      <Button
        type='submit'
        disabled={fetchingRhymingWords}
        onSubmit={handleSubmit(submitHandler)}
        text={`${fetchingRhymingWords ? 'Searching' : 'Search'} Rhyming Words`}
      />
    </form>
  );
};
