export const setNotification = (notification) => {
  return {
    type: 'ADD_NOTIFICATION',
    notification,
  };
};

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
  };
};

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return action.notification;

    case 'REMOVE_NOTIFICATION':
      return null;

    default:
      return null;
  }
};

export default reducer;
