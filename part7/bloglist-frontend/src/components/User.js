import React from 'react';
import { useLocation } from 'react-router-dom';

const User = () => {
  const location = useLocation();
  const user = location.state;

  if (user === null) {
    return null;
  }

  return (
    <div className="user">
      <h2>{user.name}</h2>
      <h4>Added Blogs</h4>
      <div className="ui relaxed divided list">
        {user.blogs.map((blog) => (
          <div className="item" key={blog.id}>
            {blog.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
