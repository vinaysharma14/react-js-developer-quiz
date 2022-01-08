import { FC } from 'react';

import './styles.scss';

interface Props {
  heading: string;
  subHeading: string;
}

export const Greetings: FC<Props> = ({ heading, subHeading }) => (
  <div className='greetings-container'>
    <h1>{heading}</h1>
    <p>{subHeading}</p>
  </div>
);