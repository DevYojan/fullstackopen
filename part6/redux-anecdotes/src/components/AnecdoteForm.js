import React from 'react';
import { useDispatch } from 'react-redux';
import { addAnecdote, getId } from '../reducers/anecdoteReducer';
import { removeNotification, setNotification } from '../reducers/notificationReducer';
import anecDoteService from '../services/anecdote';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAnecdote = await anecDoteService.createAnecdote({
      content: e.target.anecdote.value,
      id: 100000 * Math.random().toFixed(0),
      votes: 0,
    });

    dispatch(addAnecdote(newAnecdote));
    dispatch(setNotification(`'${e.target.anecdote.value}' added successfully.`));
    setTimeout(() => dispatch(removeNotification()), 5000);
    e.target.anecdote.value = '';
  };

  return (
    <div>
      <form className='ui form' onSubmit={handleSubmit}>
        <div className='field'>
          <label>Create new Anecdote</label>

          <input name='anecdote' />
        </div>
        <button className='ui button primary'>Create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
