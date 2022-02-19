import { combineReducers, createStore } from 'redux';
import blogReducer from './store/reducers/blogReducer';
import notificationReducer from './store/reducers/notificationReducer';
import userReducer from './store/reducers/userReducer';
import loginReducer from './store/reducers/loginReducer';

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  users: userReducer,
  login: loginReducer,
});

export const store = createStore(reducer);
