import React from 'react';
import { useLocation } from 'react-router-dom';

const User = () => {
  const location = useLocation();
  const user = location.state;

  if (user === null) {
    return null;
  }

  console.log(user);

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>Added Blogs</h4>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
