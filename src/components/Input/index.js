import React from 'react';

const Input = props => (
  <input
    type="text"
    {...props}
    className="p-4 block rounded w-full mb-2 text-black"
  />
);

export default Input;