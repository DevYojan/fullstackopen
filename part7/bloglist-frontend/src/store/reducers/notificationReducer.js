export const setNotification = (
  notification,
  notificationType = 'success',
  timerID = 0
) => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      notification: notification,
      notificationType: notificationType,
      timerID,
    },
  };
};

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
  };
};

const notificationReducer = (state = { timerID: 0 }, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      clearTimeout(state.timerID);
      return {
        notification: action.data.notification,
        notificationType: action.data.notificationType,
        timerID: action.data.timerID,
      };

    case 'REMOVE_NOTIFICATION':
      return { timerID: 0 };

    default:
      return state;
  }
};

export default notificationReducer;
