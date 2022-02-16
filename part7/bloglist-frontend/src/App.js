import React, { useState, useEffect } from 'react';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';

import blogService from './services/blogs';
import loginService from './services/login';

import { useDispatch, useSelector } from 'react-redux';

import {
  removeNotification,
  setNotification,
} from './store/reducers/notificationReducer';
import { initBlog } from './store/reducers/blogReducer';
import { login, logout } from './store/reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      const blogs = await blogService.getAll();
      blogs.map((blog) => {
        blog.visible = false;
      });
      dispatch(initBlog(blogs));
    })();
  }, [dispatch]);

  const blogs = useSelector((state) => state.blogs);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //Checking localStorage for saved logins.
  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('blogUser'));

    if (user) {
      dispatch(login(user));
      blogService.setToken(user.token);
    }
  }, []);

  const user = useSelector((state) => state.user);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await loginService.login({ username, password });
      dispatch(login(response.data));
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
    dispatch(logout());

    const timerID = setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);

    dispatch(setNotification('logged out successfully!', 'success', timerID));
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
        <Blog key={blog.id} blog={blog} userId={user.id} className="blog" />
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
