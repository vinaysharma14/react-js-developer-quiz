import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from 'store';
import { RhymingWordType, fetchRhymingWordsService } from 'services/rhyme-words';

interface RhymingWordsState {
  fetchingRhymingWords: boolean,
  rhymingWordsFetchError: string,
  rhymingWords: RhymingWordType[],
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
      { payload }: PayloadAction<RhymingWordType[]>,
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

    dispatch(fetchRhymingWordsSuccess(rhymingWords));
  } catch ({ message }) {
    dispatch(fetchRhymingWordsFailed(message as string));
  }
};
