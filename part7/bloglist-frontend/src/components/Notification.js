import React from 'react';
import { useSelector } from 'react-redux';

const style = {
  border: '1px solid black',
  padding: '1em',
  background: 'green',
  fontWeight: 'bold',
  color: 'white',
};

const Notification = () => {
  const notification = useSelector((state) => state);

  return notification ? <div style={style}>{notification}</div> : null;
};

export default Notification;
