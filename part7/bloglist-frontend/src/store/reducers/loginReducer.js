export const login = (user) => {
  return {
    type: 'LOGIN',
    user,
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.user;

    case 'LOGOUT':
      return null;

    default:
      return state;
  }
};

export default loginReducer;
