import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import blogService from '../services/blogs';
import { likeBlog, deleteBlog, getBlog } from '../store/reducers/blogReducer';
import {
  removeNotification,
  setNotification,
} from '../store/reducers/notificationReducer';

const Blog = () => {
  const location = useLocation();
  const blogId = useParams().id;
  const userId = location.state.userId;

  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      const blog = await blogService.getBlog(blogId);
      dispatch(getBlog(blog));
    })();
  }, [dispatch]);

  const blog = useSelector((state) => state.blogs);

  const [comment, setComment] = useState('');

  const addComment = (event) => {
    event.preventDefault();
    console.log('here');
  };

  const handleLike = async (blogToLike) => {
    const increasedLikeBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
    };

    const modifiedBlog = await blogService.like(increasedLikeBlog);
    console.log(modifiedBlog);
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

  if (Array.isArray(blog) || blog === null) {
    return null;
  }

  return (
    <div className="blog">
      <div className="title">
        <h4>{blog.title}</h4>
      </div>
      <p className="author">Author: {blog.author}</p>

      <div className="details">
        <p className="likes">
          Likes: <span id="likes">{blog.likes}</span>
          <button className="likeButton" onClick={() => handleLike(blog)}>
            like
          </button>
        </p>
        <p>
          Url:{' '}
          <a href={blog.url} target="_blank" rel="noreferrer">
            {blog.url}
          </a>
        </p>
        {blog.user.id === userId && (
          <button onClick={() => handleDelete(blog)} className="deleteButton">
            Delete
          </button>
        )}
      </div>

      <h3>Comments</h3>
      <form action="">
        <p>
          <input
            id="comment"
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <button onSubmit={addComment}>Add Comment</button>
        </p>
      </form>
    </div>
  );
};

export default Blog;
