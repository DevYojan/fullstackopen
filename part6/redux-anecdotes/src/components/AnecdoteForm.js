import React from 'react';
import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createAnecdote = (e) => {
    e.preventDefault();
    dispatch(addAnecdote(e.target.anecdote.value));
    e.target.anecdote.value = '';
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button>Create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
