import React from 'react';
import { connect } from 'react-redux';

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  return props.notification === null || <div style={style}>{props.notification}</div>;
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification.notification,
  };
};

export default connect(mapStateToProps)(Notification);
