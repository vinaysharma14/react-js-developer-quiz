import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from 'store';
import { RhymingWordType, fetchRhymingWordsService } from 'services/rhyme-words';

interface RhymingWordsState {
  fetching: boolean,
  rhymingWordsFetchError: string,
  rhymingWords: RhymingWordType[],
}

const initialState: RhymingWordsState = {
  fetching: true,
  rhymingWords: [],
  rhymingWordsFetchError: '',
};

const rhymingWordsSlice = createSlice({
  name: 'rhymingWords',
  initialState,
  reducers: {
    fetchRhymingWordsRequest: (state: RhymingWordsState) => {
      state.fetching = true;
      state.rhymingWords = [];
      state.rhymingWordsFetchError = '';
    },
    fetchRhymingWordsSuccess: (
      state: RhymingWordsState,
      { payload }: PayloadAction<RhymingWordType[]>,
    ) => {
      state.fetching = false;
      state.rhymingWords = payload;
    },
    fetchRhymingWordsFailed: (state: RhymingWordsState, { payload }: PayloadAction<string>) => {
      state.fetching = false;
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

const fetchRhymingWords = (userInputWord: string): AppThunk => async (dispatch) => {
  dispatch(fetchRhymingWordsRequest());

  try {
    const rhymingWords = await fetchRhymingWordsService(userInputWord);

    dispatch(fetchRhymingWordsSuccess(rhymingWords));
  } catch ({ message }) {
    dispatch(fetchRhymingWordsFailed(message as string));
  }
};

export { fetchRhymingWords };
