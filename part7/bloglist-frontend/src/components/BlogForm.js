import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import blogService from '../services/blogs';
import { createBlog } from '../store/reducers/blogReducer';
import {
  setNotification,
  removeNotification,
} from '../store/reducers/notificationReducer';
import { useDispatch } from 'react-redux';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newBlog = await blogService.create({ title, author, url });

    dispatch(createBlog(newBlog));
    const timerID = setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);

    dispatch(
      setNotification(
        `${newBlog.title} created successfully`,
        'success',
        timerID
      )
    );

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form action="">
      <h2>Create Blog</h2>

      <p>
        <label htmlFor="">Title : </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </p>

      <p>
        <label htmlFor="">Author : </label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </p>

      <p>
        <label htmlFor="">Url : </label>
        <input
          id="url"
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </p>

      <button className="submitButton" onClick={handleSubmit}>
        Create
      </button>
    </form>
  );
};

export default BlogForm;
