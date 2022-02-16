import { combineReducers, createStore } from 'redux';
import blogReducer from './store/reducers/blogReducer';
import notificationReducer from './store/reducers/notificationReducer';
import userReducer from './store/reducers/userReducer';

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: userReducer,
});

export const store = createStore(reducer);
