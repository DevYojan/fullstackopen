import React from 'react';

const Input = ({ label, name, value, handleInput }) => {

  return (
    <>
      {label} <input name={name} value={value} onChange={handleInput} />
    </>
  );
}

export default Input;