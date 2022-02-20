import React from 'react';
import { useParams } from 'react-router-dom';

const User = () => {
  const id = useParams().id;

  return (
    <div>
      <h2>Yojan Regmi</h2>
    </div>
  );
};

export default User;
