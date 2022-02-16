import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import blogService from '../services/blogs';
import { likeBlog } from '../store/reducers/blogReducer';
import {
  removeNotification,
  setNotification,
} from '../store/reducers/notificationReducer';

const Blog = ({ blog, deleteBlog, userId }) => {
  const [visibility, setVisibility] = useState(false);
  const dispatch = useDispatch();

  const handleLike = async (blogToLike) => {
    const increasedLikeBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
    };

    const modifiedBlog = await blogService.like(increasedLikeBlog);
    const blogUserID = modifiedBlog.user;
    delete modifiedBlog.user;
    modifiedBlog.user = {};
    modifiedBlog.user.id = blogUserID;

    dispatch(likeBlog(modifiedBlog));

    const timerID = setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);

    dispatch(
      setNotification(`you liked ${blogToLike.title}!`, 'success', timerID)
    );
  };

  const showOrHide = { display: visibility ? '' : 'none' };

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  const handleClick = (blog) => {
    const result = window.confirm(
      `Remove blog '${blog.title}' by ${blog.author}?`
    );

    if (result) {
      deleteBlog(blog.id);
    }
  };

  return (
    <div className="blog">
      <div className="title">{blog.title}</div>
      <p className="author">Author: {blog.author}</p>
      <button className="showButton" onClick={toggleVisibility}>
        {visibility ? 'hide' : 'view'}
      </button>

      <div style={showOrHide} className="details">
        <p className="likes">
          Likes: <span id="likes">{blog.likes}</span>
          <button className="likeButton" onClick={() => handleLike(blog)}>
            like
          </button>
        </p>
        <p>Url: {blog.url}</p>
        {blog.user.id === userId && (
          <button onClick={() => handleClick(blog)} className="deleteButton">
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;
