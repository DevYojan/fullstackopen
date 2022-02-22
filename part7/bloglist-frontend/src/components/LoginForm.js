import React, { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { login } from '../store/reducers/loginReducer';
import {
  removeNotification,
  setNotification,
} from '../store/reducers/notificationReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      navigate('/');
    } catch {
      const timerID = setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);

      dispatch(setNotification('Incorrect credentials', 'error', timerID));
    }
  };

  return (
    <div>
      <form action="">
        <h3 className="header">Login</h3>
        <div className="ui fluid labeled input">
          <label className="ui label" htmlFor="">
            Username:{' '}
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <br />
        <div className="ui fluid labeled input">
          <label className="ui label" htmlFor="">
            Password:{' '}
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <br />
        <button className="ui button primary" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
