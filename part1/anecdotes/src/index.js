import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Anecdote from './Anecdote';

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);

  const emptyArrayWithZeroes = [];
  emptyArrayWithZeroes.length = anecdotes.length;
  emptyArrayWithZeroes.fill(0);

  const [votes, setVoteCount] = useState(emptyArrayWithZeroes);


  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  }

  const voteQuote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVoteCount(copy);
  }

  const mostVoted = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <button onClick={voteQuote}>vote</button>
      <button onClick={getRandomQuote} >next anecdote</button>

      <h2>Anecdote with most votes</h2>
      <Anecdote anecdote={anecdotes[mostVoted]} votes={votes[mostVoted]} />

    </div>
  );
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
);