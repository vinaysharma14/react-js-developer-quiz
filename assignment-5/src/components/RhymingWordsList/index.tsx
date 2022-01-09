import { FC, useMemo } from 'react';
import { RootState } from 'store';
import { useSelector } from 'react-redux';

import './styles.scss';

type RhymingWordProps = {
  word?: string;
};

const RhymingWord: FC<RhymingWordProps> = ({ word }) => (
  <div className='word-container'>{word ? <p>{word}</p> : <div />}</div>
);

export const RhymingWordsList = () => {
  const {
    rhymingWords,
    fetchingRhymingWords,
    rhymingWordsFetchError: err,
  } = useSelector(({ rhymingWordsReducer }: RootState) => rhymingWordsReducer);

  const render = useMemo(() => {
    if (fetchingRhymingWords) {
      return [...Array(20)].map(() => <RhymingWord />);
    }

    if (rhymingWords.length) {
      return rhymingWords.map((word) => <RhymingWord word={word} />);
    }

    return (
      <i className={err ? 'error' : ''}>
        {err || 'The list of rhyming words would show here as you search.'}
      </i>
    );
  }, [err, rhymingWords, fetchingRhymingWords]);

  return <div className='rhyming-words-list-container'>{render}</div>;
};
