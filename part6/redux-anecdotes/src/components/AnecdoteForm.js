import React from 'react';
import { connect } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    props.addAnecdote(e.target.anecdote.value);
    props.setNotification(`'${e.target.anecdote.value}' added successfully.`, 5000);
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

const mapDispatchToProps = {
  addAnecdote,
  setNotification,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
