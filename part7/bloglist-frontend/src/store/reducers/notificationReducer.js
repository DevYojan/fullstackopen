export const setNotification = (notification, notificationType = 'success') => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      notification: notification,
      notificationType: notificationType,
    },
  };
};

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
  };
};

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data;

    case 'REMOVE_NOTIFICATION':
      return null;

    default:
      return null;
  }
};

export default notificationReducer;
