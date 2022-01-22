import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { upvote } from '../reducers/anecdoteReducer';
import { setNotification, removeNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const filterKey = useSelector((state) => state.filterKey);

  const anecdotes = useSelector((state) => {
    if (state.filterKey !== null) {
      return state.anecdotes.filter(
        (el) => el.content.toLowerCase().indexOf(filterKey.toLowerCase()) !== -1
      );
    }

    return state.anecdotes;
  });
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(upvote(anecdote.id));
    dispatch(setNotification(`You voted '${anecdote.content}'`));
    setTimeout(() => dispatch(removeNotification()), 5000);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div className='ui segment' key={anecdote.id}>
          <h4 className='ui header'>{anecdote.content}</h4>
          <div>
            has {anecdote.votes}
            <button className='ui mini button' onClick={() => vote(anecdote)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
