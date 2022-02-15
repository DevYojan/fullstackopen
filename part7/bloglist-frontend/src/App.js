import React, { useState, useEffect } from 'react';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';

import blogService from './services/blogs';
import loginService from './services/login';
import {
  removeNotification,
  setNotification,
} from './store/reducers/notificationReducer';
import { useDispatch } from 'react-redux';
import { initBlog } from './store/reducers/blogReducer';
import { useSelector } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      const blogs = await blogService.getAll();
      blogs.sort((a, b) => b.likes - a.likes);
      blogs.map((blog) => {
        blog.visible = false;
      });
      dispatch(initBlog(blogs));
    })();
  }, [dispatch]);

  const blogs = useSelector((state) => state.blogs);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');

  //Checking localStorage for saved logins.
  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('blogUser'));

    if (user) {
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await loginService.login({ username, password });
      setUser(response.data);
      blogService.setToken(response.data.token);
      window.localStorage.setItem('blogUser', JSON.stringify(response.data));

      const timerID = setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);

      dispatch(
        setNotification(
          `${username} logged in successfully!`,
          'success',
          timerID
        )
      );

      setUsername('');
      setPassword('');
    } catch {
      const timerID = setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);

      dispatch(setNotification('Incorrect credentials', 'error', timerID));
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('blogUser');
    setUser(null);

    const timerID = setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);

    dispatch(setNotification('logged out successfully!', 'success', timerID));
  };

  const handleLike = async (blogToLike) => {
    const increasedLikeBlog = {
      user: blogToLike.user.id,
      likes: blogToLike.likes + 1,
      author: blogToLike.author,
      title: blogToLike.title,
      url: blogToLike.url,
      id: blogToLike.id,
    };

    const modifiedBlog = await blogService.like(increasedLikeBlog);

    //replace the modified blog
    const temp = [...blogs];

    temp.map((blog) => {
      if (blog.id === modifiedBlog.id) {
        blog.likes = modifiedBlog.likes;
      }
    });

    temp.sort((a, b) => b.likes - a.likes);

    setBlogs(temp);
    const timerID = setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);

    dispatch(
      setNotification(`you liked ${blogToLike.title}!`, 'success', timerID)
    );
  };

  const deleteBlog = async (id) => {
    const response = await blogService.remove(id);

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

    setBlogs(blogs.filter((blog) => blog.id !== id));
    const timerID = setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);

    dispatch(setNotification('Blog deleted successfully', 'success', timerID));
  };

  const loginForm = () => (
    <form action="">
      <h2>Login</h2>
      <label htmlFor="">Username: </label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <br />
      <label htmlFor="">Password: </label>
      <input
        id="password"
        type="text"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
    </form>
  );

  const showBlogs = () => (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          deleteBlog={deleteBlog}
          userId={user.id}
          className="blog"
        />
      ))}
    </div>
  );

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {/* {message && showMessage()} */}
      {user && (
        <p>
          {user.username} logged in !{' '}
          <button onClick={handleLogout}>Logout</button>{' '}
        </p>
      )}
      {!user && loginForm()}
      {user && <BlogForm />}
      {user && blogs && showBlogs()}
    </div>
  );
};

export default App;
