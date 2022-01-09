import { call } from './index';
import { API_ERRORS } from 'errors';

type RhymingWordType = {
  word: string;
  score: number;
  numSyllables: number;
}[];

export const fetchRhymingWords = async (userInputWord: string): Promise<RhymingWordType[]> => {
  try {
    const rhymingWords = (await call(
      'GET',
      `words?rel_rhy=${userInputWord}`,
    )) as unknown as RhymingWordType[];

    if (rhymingWords.length === 0) {
      throw new Error(API_ERRORS.noResult);
    }

    return rhymingWords;
  } catch ({ message }: unknown) {
    const errorMessage = message as string;

    switch (errorMessage.split(': ')[1]) {
      case '500':
      case '404':
      case 'Failed to fetch':
        throw new Error(API_ERRORS.tryAgain);

      default:
        throw new Error(errorMessage);
    }
  }
};
