import { FC, useMemo, ButtonHTMLAttributes } from 'react';

import './styles.scss';

interface Props {
  text: string;
  isLoading?: boolean;
}

export const Button: FC<Props & ButtonHTMLAttributes<HTMLButtonElement>> = ({
  type,
  text,
  onClick,
  onSubmit,
  isLoading,
}) => {
  const isSubmit = useMemo(() => type === 'submit', [type]);

  return (
    <button
      onClick={onClick}
      onSubmit={onSubmit}
      disabled={isLoading}
      type={isSubmit ? 'submit' : 'button'}
    >
      {text}
      {isLoading && <div className='loader' />}
    </button>
  );
};
