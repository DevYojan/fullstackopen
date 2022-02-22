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
      <div className="ui raised very padded text container segment">
        <h1 className="header">Blogs</h1>
        <Notification />
        <LoginForm />
      </div>
    );
  }

  return (
    <div className="ui raised very padded text container segment">
      <div className="ui four item menu">
        <Link className="item" to="/">
          Home
        </Link>
        <Link className="item" to="/blogs">
          Blogs
        </Link>
        <Link className="item" to="/users">
          Users
        </Link>
        {loggedUser && (
          <div className="item">
            {loggedUser.username} logged in !
            <button className="mini red ui button" onClick={handleLogout}>
              <i className="small power off icon"></i>
            </button>
          </div>
        )}
      </div>

      <div className="ui grid">
        <h1 className="ui header eight wide column">Blogs</h1>
        {/* {message && showMessage()} */}
      </div>

      <div className="ui hidden divider"></div>

      <Notification />
      {location.pathname !== '/createBlog' && (
        <Link to="/createBlog">
          <button className="ui positive button">Create New</button>
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
