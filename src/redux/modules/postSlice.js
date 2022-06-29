import { createSlice } from '@reduxjs/toolkit';
// import instance from '../../shared/axios';

// 예시
export const loadPostDB = postData => {
  return async function (dispatch) {
    try {
      dispatch(loadPost(postData));
    } catch (error) {
      console.log(error);
    }
  };
};

const postSlice = createSlice({
  name: 'post',
  initialState: {
    list: [],
  },

  reducers: {
    // 예시
    // changeName: (state, action) => {
    //   state.name = action.payload;
    // },
    addPost: (state, action) => {
      console.log(action.payload);
      state.list = action.payload;
    },
    loadPost: (state, action) => {
      // console.log(action.payload);
      state.list = action.payload;
    },
  },
});

export const postActions = postSlice.actions;
export const { addPost, loadPost } = postSlice.actions;
export default postSlice.reducer;
