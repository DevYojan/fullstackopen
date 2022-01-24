export const setNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      data: {
        notification,
        time,
      },
    });

    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
      });
    }, time);
  };
};

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return action.data.notification;

    case 'REMOVE_NOTIFICATION':
      return null;

    default:
      return state;
  }
};

export default reducer;
