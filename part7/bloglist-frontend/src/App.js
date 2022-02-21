import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Users from './components/Users';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import Blog from './components/Blog';

import blogService from './services/blogs';

import { useDispatch, useSelector } from 'react-redux';

import {
  removeNotification,
  setNotification,
} from './store/reducers/notificationReducer';
import { login, logout } from './store/reducers/loginReducer';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
} from 'react-router-dom';
import User from './components/User';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

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
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/blogs">Blogs</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
      <h1>blogs</h1>
      <Notification />
      {/* {message && showMessage()} */}
      {loggedUser && (
        <p>
          {loggedUser.username} logged in !{' '}
          <button onClick={handleLogout}>Logout</button>{' '}
        </p>
      )}

      {location.pathname !== '/createBlog' && (
        <Link to="/createBlog">
          <button>Create New</button>
        </Link>
      )}

      <Routes>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/user/:id" element={<User />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/createBlog" element={<BlogForm />}></Route>
        <Route path="/blogs" element={<Blogs user={loggedUser} />}></Route>
        <Route path="/blogs/:id" element={<Blog />}></Route>
        <Route path="/" element={<Blogs user={loggedUser} />}></Route>
      </Routes>
    </div>
  );
};

export default App;
