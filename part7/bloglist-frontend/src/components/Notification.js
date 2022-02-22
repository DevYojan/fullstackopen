import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification.notification) {
    return null;
  }

  const messageType =
    notification.notificationType === 'success' ? 'positive' : 'negative';

  return notification ? (
    <div className={`ui ${messageType} floating message`}>
      {notification.notification}
    </div>
  ) : null;
};

export default Notification;
