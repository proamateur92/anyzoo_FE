import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import instance from '../../shared/axios';

// import instance from '../../shared/axios';

// 예시
export const loadCommentsDB = createAsyncThunk(
  'loadComment', async ( data ) => {
    // const response = await axios.get('http://localhost:5000/comment/?postId=' + postId).catch((err) => console.log(err))
    const response = await instance.get(`/api/comment/${data.postId}?page=${data.pgNo}` ).catch((err) => console.log(err))
    console.log(response)
    return response.data.comments
  }
);

export const addCommentDB = createAsyncThunk(
  'addComment',
  async (commentData) => {
       const response = await instance.post('/api/comment/' + commentData.postId, {comment: commentData.content})
    console.log(response)
    const newComment = {...commentData}
    return newComment;
  }
);

export const editCommentDB = createAsyncThunk(
  'editComment', 
  async (commentData) => {
    console.log(commentData)
    await instance.patch('/api/comment/edit/' + commentData.commentId, {comment: commentData.comment})
    window.alert('수정되었습니다')
    return commentData
  }
)

export const deleteCommentDB = createAsyncThunk(
  'deleteComment', 
  async (commentData) => {
    await instance.delete(`/api/comment/edit/${commentData.boardMainId}/${commentData.commentId}`)
    window.alert('삭제되었습니다')
    return commentData.commentId
  }
)

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
    },
    [addCommentDB.fulfilled] : (state, { payload }) => {
      state.list = [...state.list, payload]
    },
    [editCommentDB.fulfilled] : (state, { payload }) => {
      state.list.map((c) =>  c.id !== payload.id ? c : payload)
    },
    [deleteCommentDB.fulfilled] : (state, { payload }) => {
      state.list.filter((c) =>  c.id !== payload)
    }
  }
});

export const commentActions = commentSlice.actions;
export default commentSlice.reducer;
 