import { createStore } from 'redux';
import notificationReducer from './store/reducers/notificationReducer';

const store = createStore(notificationReducer);

export default store;
