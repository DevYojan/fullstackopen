import anecDoteService from '../services/anecdote';

export const upvote = (id) => {
  return {
    type: 'UPVOTE',
    data: {
      id: id,
    },
  };
};

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecDoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

export const addAnecdote = (data) => {
  return {
    type: 'ADD_ANECDOTE',
    data,
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data;

    case 'ADD_ANECDOTE':
      return [...state, action.data].sort((a, b) => b.votes - a.votes);

    case 'UPVOTE':
      const anecdoteToChange = state.find((n) => n.id === action.data.id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state
        .map((anecdote) => (anecdote.id !== action.data.id ? anecdote : changedAnecdote))
        .sort((a, b) => b.votes - a.votes);

    default:
      return state.sort((a, b) => b.votes - a.votes);
  }
};

export default reducer;
