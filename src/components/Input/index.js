import React from 'react';
import cx from 'classnames';

const Input = props => (
  <input
    type="text"
    {...props}
    minLength={3}
    required
    className={cx(
      'p-4',
      'block',
      'rounded',
      'w-full',
      'mb-2',
      'text-black',
    )}
  />
);

export default Input;