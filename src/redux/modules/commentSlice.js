import { createSlice } from '@reduxjs/toolkit';
// import instance from '../../shared/axios';

// 예시
export const loadCommentDB = commentData => {
  return async function (dispatch) {
    try {
      dispatch(loadComment(commentData));
    } catch (error) {
      console.log(error);
    }
  };
};

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    list: [],
  },

  reducers: {
    // 예시
    // changeName: (state, action) => {
    //   state.name = action.payload;
    // },
    addComment: (state, action) => {
      console.log(action.payload);
      state.list = action.payload;
    },
    loadComment: (state, action) => {
      // console.log(action.payload);
      state.list = action.payload;
    },
  },
});

export const commentActions = commentSlice.actions;
export const { addComment, loadComment } = commentSlice.actions;
export default commentSlice.reducer;
