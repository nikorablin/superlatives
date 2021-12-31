import React from 'react';
import cx from 'classnames';

const Button = ({ className, ...props }) =>
  <button
    {...props}
    className={cx(
      'p-4',
      'block',
      'rounded',
      'w-full',
      'bg-rose-600',
      'hover:bg-rose-800',
      'font-serif',
      'shadow',
      className,
    )}
  />;

export default Button;