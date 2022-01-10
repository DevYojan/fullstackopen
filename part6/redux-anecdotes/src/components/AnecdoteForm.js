import React from 'react';
import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { removeNotification, setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createAnecdote = (e) => {
    e.preventDefault();
    dispatch(addAnecdote(e.target.anecdote.value));
    dispatch(setNotification(`'${e.target.anecdote.value}' added successfully.`));
    setTimeout(() => dispatch(removeNotification()), 5000);
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
