import React, { useEffect } from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import { useDispatch } from 'react-redux';
import { initAnecdotes } from './reducers/anecdoteReducer';
import anecDoteService from './services/anecdote';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    anecDoteService.getAll().then((anecdotes) => {
      dispatch(initAnecdotes(anecdotes));
    });
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
