export const getAllUsers = (users) => {
  return {
    type: 'GET_ALL',
    users,
  };
};

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'GET_ALL':
      return action.users;

    default:
      return state;
  }
};

export default userReducer;
