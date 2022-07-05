import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

// import instance from '../../shared/axios';

// 예시
export const loadCommentsDB = createAsyncThunk(
  'loadComment', async ( postId ) => {
    const response = await axios.get('http://localhost:5000/comment/?postId=' + postId).catch((err) => console.log(err))
    return response.data
  }
);


const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    list: [],
  },
  reducers: {
  },
  extraReducers: {
    [loadCommentsDB.fulfilled] : (state, { payload }) => {
      state.list = payload
    }
  }
});

export const commentActions = commentSlice.actions;
export const { loadComment } = commentSlice.actions;
export default commentSlice.reducer;
 