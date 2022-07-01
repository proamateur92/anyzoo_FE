import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
// import instance from '../../shared/axios';

// 예시
// export const loadPostDB = postData => {
//   return async function (dispatch) {
//     try {
//       dispatch(loadPost(postData));
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };


export const loadPostsDB = createAsyncThunk(
  'loadPost', async() => {
    const response = await axios.get('http://localhost:5000/post').catch((err) => console.log(err))
    return response.data
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState: {
    list: [],
  },

  reducers: {
    addPost: (state, action) => {
      console.log(action.payload);
      state.list = action.payload;
    },
  },

  extraReducers: {
    [loadPostsDB.fulfilled] : (state, { payload }) => {
      state.list = payload
    }
  }
});

export const postActions = postSlice.actions;
export const { addPost, loadPost } = postSlice.actions;
export default postSlice.reducer;
