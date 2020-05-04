import React from 'react';

const Notification = ({ notification }) => {
	if (notification === null) {
		return null;
	}

	console.log(notification);

	return (
		<div className={notification.type}>
			<p>{notification.message}</p>
		</div>
	);
};

export default Notification;
