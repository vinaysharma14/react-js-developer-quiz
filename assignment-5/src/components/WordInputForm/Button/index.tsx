import { FC, useMemo, ButtonHTMLAttributes } from 'react';

import './styles.scss';

interface Props {
  text: string
  loading?: boolean
}

export const Button: FC<Props & ButtonHTMLAttributes<HTMLButtonElement>> = ({
  type,
  text,
  onClick,
  onSubmit,
  disabled,
}) => {
  const isSubmit = useMemo(() => type === 'submit', [type]);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onSubmit={onSubmit}
      type={isSubmit ? 'submit' : 'button'}
    >
      {text}
    </button>
  );
};
