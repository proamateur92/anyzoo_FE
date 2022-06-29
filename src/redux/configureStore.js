import { configureStore } from '@reduxjs/toolkit';
import userReducer from './modules/userSlice';
import postReducer from './modules/postSlice';
import heartReducer from './modules/heartSlice';
import commentReducer from './modules/commentSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    comment: commentReducer,
    heart: heartReducer,
  },
});

export default store;
