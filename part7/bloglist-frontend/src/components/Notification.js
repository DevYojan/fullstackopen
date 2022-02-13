import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state);

  if (notification === null) {
    return null;
  }

  const style = {
    border: '1px solid black',
    padding: '1em',
    background: notification.notificationType === 'success' ? 'green' : 'red',
    fontWeight: 'bold',
    color: 'white',
  };

  return notification ? (
    <div style={style}>{notification.notification}</div>
  ) : null;
};

export default Notification;
