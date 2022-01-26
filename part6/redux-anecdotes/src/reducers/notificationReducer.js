export const setNotification = (notification, time) => {
  return async (dispatch) => {
    const timeOutID = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
      });
    }, time);

    dispatch({
      type: 'ADD_NOTIFICATION',
      data: {
        notification,
        timeOutID,
      },
    });
  };
};

const initialState = { notification: null, timeOutID: 0 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      clearTimeout(state.timeOutID);
      return { ...state, notification: action.data.notification, timeOutID: action.data.timeOutID };

    case 'REMOVE_NOTIFICATION':
      return initialState;

    default:
      return state;
  }
};

export default reducer;
