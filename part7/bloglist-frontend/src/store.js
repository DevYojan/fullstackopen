import { combineReducers, createStore } from 'redux';
import blogReducer from './store/reducers/blogReducer';
import notificationReducer from './store/reducers/notificationReducer';

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
});

export const store = createStore(reducer);
