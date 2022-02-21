import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import blogService from '../services/blogs';
import { likeBlog, deleteBlog } from '../store/reducers/blogReducer';
import {
  removeNotification,
  setNotification,
} from '../store/reducers/notificationReducer';

const Blog = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const blog = location.state.blog;
  const userId = location.state.userId;

  const [likes, setLikes] = useState(blog.likes);

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
    setLikes(modifiedBlog.likes);

    const timerID = setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);

    dispatch(
      setNotification(`you liked ${blogToLike.title}!`, 'success', timerID)
    );
  };

  const handleDelete = async (blog) => {
    const result = window.confirm(
      `Remove blog '${blog.title}' by ${blog.author}?`
    );

    if (!result) {
      return;
    }

    const response = await blogService.remove(blog.id);

    if (response.status !== 204) {
      const timerID = setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);

      dispatch(
        setNotification(
          'An error occured while deleting the blog',
          'success',
          timerID
        )
      );
    }

    dispatch(deleteBlog(blog.id));

    const timerID = setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);

    dispatch(setNotification('Blog deleted successfully', 'success', timerID));
  };

  return (
    <div className="blog">
      <div className="title">{blog.title}</div>
      <p className="author">Author: {blog.author}</p>

      <div className="details">
        <p className="likes">
          Likes: <span id="likes">{likes}</span>
          <button className="likeButton" onClick={() => handleLike(blog)}>
            like
          </button>
        </p>
        <p>Url: {blog.url}</p>
        {blog.user.id === userId && (
          <button onClick={() => handleDelete(blog)} className="deleteButton">
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;
