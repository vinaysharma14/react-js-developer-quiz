import './styles.scss';

import { Greetings, WordInputForm } from 'components';

export const App = () => {
  return (
    <div className='app-container'>
      <Greetings
        heading='Welcome to Rhyme App'
        subHeading='Find rhyming words for your input with our powerful word-finding query engine!'
      />

      <WordInputForm />
    </div>
  );
};
