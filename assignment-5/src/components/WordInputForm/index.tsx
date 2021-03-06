import { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'store';
import { CONSTANTS } from 'constant';
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

  const { submitButtonText, fetchingRhymingWords } = useSelector(
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
          pattern: /^[a-zA-Z]+$/,
          minLength: CONSTANTS.minUserWordInputLength,
          maxLength: CONSTANTS.maxUserWordInputLength,
        })}
        placeholder='Try searching "success"'
        error={errors.word?.type as FormErrorType | undefined}
      />

      <Button
        type='submit'
        text={submitButtonText}
        isLoading={fetchingRhymingWords}
        onSubmit={handleSubmit(submitHandler)}
      />
    </form>
  );
};
