import React, { useState } from 'react';
import cx from 'classnames';

const Input = ({ onChange, ...props }) => {
  const [error, setError] = useState(false);
  const onInvalid = () => setError(true);
  const clearErrorOnChange = (evt) => {
    setError(false);
    onChange(evt);
  }

  return (
    <div className="relative">
      {error && <span className="absolute text-rose-600 text-3xl text-bold right-3 top-3">!</span>}
      <input
        {...props}
        type="text"
        onChange={clearErrorOnChange}
        minLength={3}
        required
        onInvalid={onInvalid}
        className={cx(
          {
            'border-rose-600': error,
          },
          'border-2',
          'p-4',
          'block',
          'rounded',
          'w-full',
          'mb-2',
          'text-black',
        )}
      />
    </div>
  );
}
  

export default Input;