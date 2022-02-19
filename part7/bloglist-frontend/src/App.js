import React, { useEffect } from 'react';

import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Users from './components/Users';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';

import blogService from './services/blogs';

import { useDispatch, useSelector } from 'react-redux';

import {
  removeNotification,
  setNotification,
} from './store/reducers/notificationReducer';
import { initBlog } from './store/reducers/blogReducer';
import { login, logout } from './store/reducers/loginReducer';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      const blogs = await blogService.getAll();
      blogs.map((blog) => {
        blog.visible = false;
      });
      dispatch(initBlog(blogs));
    })();
  }, [dispatch]);

  //Checking localStorage for saved logins.
  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('blogUser'));

    if (loggedUser) {
      dispatch(login(loggedUser));
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const loggedUser = useSelector((state) => state.login);

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('blogUser');
    dispatch(logout());

    const timerID = setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);

    dispatch(setNotification('logged out successfully!', 'success', timerID));
    navigate('/login');
  };

  if (loggedUser === null) {
    return (
      <div>
        <h1>Blogs</h1>
        <Notification />
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification />
      {/* {message && showMessage()} */}
      {loggedUser && (
        <p>
          {loggedUser.username} logged in !{' '}
          <button onClick={handleLogout}>Logout</button>{' '}
        </p>
      )}

      <Routes>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/createBlog" element={<BlogForm />}></Route>
        <Route path="/" element={<Blogs user={loggedUser} />}></Route>
      </Routes>
    </div>
  );
};

export default App;
