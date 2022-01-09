import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from 'store';
import { CONSTANTS } from 'constant';
import { RhymingWordType, fetchRhymingWordsService } from 'services/rhyming-words-service';

interface RhymingWordsState {
  fetchingRhymingWords: boolean,
  rhymingWordsFetchError: string,
  rhymingWords: RhymingWordType['word'][],
}

const initialState: RhymingWordsState = {
  rhymingWords: [],
  rhymingWordsFetchError: '',
  fetchingRhymingWords: false,
};

const rhymingWordsSlice = createSlice({
  name: 'rhymingWords',
  initialState,
  reducers: {
    fetchRhymingWordsRequest: (state: RhymingWordsState) => {
      state.rhymingWords = [];
      state.fetchingRhymingWords = true;
      state.rhymingWordsFetchError = '';
    },
    fetchRhymingWordsSuccess: (
      state: RhymingWordsState,
      { payload }: PayloadAction<RhymingWordType['word'][]>,
    ) => {
      state.rhymingWords = payload;
      state.fetchingRhymingWords = false;
    },
    fetchRhymingWordsFailed: (state: RhymingWordsState, { payload }: PayloadAction<string>) => {
      state.fetchingRhymingWords = false;
      state.rhymingWordsFetchError = payload;
    },
  },
});

export const rhymingWordsReducer = rhymingWordsSlice.reducer;

const {
  fetchRhymingWordsRequest,
  fetchRhymingWordsSuccess,
  fetchRhymingWordsFailed,
} = rhymingWordsSlice.actions;

export const fetchRhymingWords = (userInputWord: string): AppThunk => async (dispatch) => {
  dispatch(fetchRhymingWordsRequest());

  try {
    const rhymingWords = await fetchRhymingWordsService(userInputWord);

    dispatch(fetchRhymingWordsSuccess(
      rhymingWords
        // it's impractical to display all the search results to user
        // so ideally we should filter out only those which surpass a
        // threshold score and lie between a range of word length
        .filter(({ score, word }) =>
          score >= CONSTANTS.minRhymingWordScore &&
          word.length >= CONSTANTS.minRhymingWordLength &&
          word.length <= CONSTANTS.maxRhymingWordLength,
        )
        // sort the rhyming words in descending order of their score
        .sort((wordA, wordB) => wordB.score - wordA.score)
        // map only the words as user isn't concerned with the rest of the data for now
        .map(({ word }) => word),
    ));
  } catch ({ message }) {
    dispatch(fetchRhymingWordsFailed(message as string));
  }
};
