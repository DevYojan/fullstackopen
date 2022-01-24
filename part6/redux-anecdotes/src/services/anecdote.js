import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createAnecdote = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

const updateAnecdote = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, {
    content: anecdote.content,
    id: anecdote.id,
    votes: ++anecdote.votes,
  });

  return response.data;
};

export default { getAll, createAnecdote, updateAnecdote };
