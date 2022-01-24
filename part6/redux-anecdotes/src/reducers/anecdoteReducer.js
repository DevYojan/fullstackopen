import anecDoteService from '../services/anecdote';

export const upvote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecDoteService.updateAnecdote(anecdote);
    dispatch({
      type: 'UPVOTE',
      data: updatedAnecdote,
    });
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

export const addAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecDoteService.createAnecdote({
      content: anecdote,
      id: 100000 * Math.random().toFixed(0),
      votes: 0,
    });

    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAnecdote,
    });
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data.sort((a, b) => b.votes - a.votes);

    case 'ADD_ANECDOTE':
      return [...state, action.data].sort((a, b) => b.votes - a.votes);

    case 'UPVOTE':
      return state
        .map((anecdote) => (anecdote.id !== action.data.id ? anecdote : action.data))
        .sort((a, b) => b.votes - a.votes);

    default:
      return state.sort((a, b) => b.votes - a.votes);
  }
};

export default reducer;
