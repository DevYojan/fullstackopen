import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import blogService from '../services/blogs';
import { createBlog } from '../store/reducers/blogReducer';
import {
  setNotification,
  removeNotification,
} from '../store/reducers/notificationReducer';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newBlog = await blogService.create({
      title,
      author,
      url,
    });

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
      <h4 className="ui header">Create Blog</h4>

      <p className="ui fluid labeled input">
        <label className="ui label" htmlFor="">
          Title :{' '}
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          className="ui input"
        />
      </p>

      <p className="ui fluid labeled input">
        <label className="ui label" htmlFor="">
          Author :{' '}
        </label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </p>

      <p className="ui fluid labeled input">
        <label className="ui label" htmlFor="">
          Url :{' '}
        </label>
        <input
          id="url"
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </p>

      <button className="ui button primary" onClick={handleSubmit}>
        Create
      </button>
    </form>
  );
};

export default BlogForm;
