import React from 'react';
import Input from './Input';

const AddForm = ({ handleSubmit, name, number, handleChange }) => {

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          name: <Input name={'name'} value={name} handleInput={handleChange} />
        </div>
        <div>
          number: <Input name={'number'} value={number} handleInput={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
}

export default AddForm;