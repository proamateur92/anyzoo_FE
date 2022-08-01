// sweetalert
import Swal from "sweetalert2";

// redux-toolkit
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../shared/axios";

export const loadCommentsDB = createAsyncThunk("loadComment", async (data) => {
  const response = await instance.get(`/api/comment/${data.postId}?page=${data.pgNo}`).catch((err) => console.log(err));
  return { list: response.data, pgNo: data.pgNo };
});

export const addCommentDB = createAsyncThunk("addComment", async (commentData) => {
  const response = await instance.post("/api/comment/" + commentData.postId, { comment: commentData.comment });
  const newComment = { ...commentData, id: response.data.data, createdAt: "작성방금 전" };
  return newComment;
});

export const editCommentDB = createAsyncThunk("editComment", async (commentData) => {
  console.log(commentData);
  await instance.patch("/api/comment/edit/" + commentData.commentId, { comment: commentData.comment });
  Swal.fire({
    title: "수정되었습니다",
    icon: "success",
    confirmButtonText: "확인",
    confirmButtonColor: "#44DCD3",
  });
  return commentData;
});

export const deleteCommentDB = createAsyncThunk("deleteComment", async (commentId) => {
  await instance.delete(`/api/comment/edit/${commentId}`);
  Swal.fire({
    title: "삭제되었습니다",
    icon: "success",
    confirmButtonText: "확인",
    confirmButtonColor: "#44DCD3",
  });
  return commentId;
});

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    list: [],
    isLast: false,
  },
  reducers: {},
  extraReducers: {
    [loadCommentsDB.fulfilled]: (state, { payload }) => {
      if (payload.pgNo === 0) {
        state.list = payload.list.comments;
      } else {
        state.list = [...state.list, ...payload.list.comments];
      }
      state.isLast = payload.list.last;
    },
    [addCommentDB.fulfilled]: (state, { payload }) => {
      state.list = [payload, ...state.list];
    },
    [editCommentDB.fulfilled]: (state, { payload }) => {
      state.list.map((c) => (c.id !== payload.id ? c : payload));
    },
    [deleteCommentDB.fulfilled]: (state, { payload }) => {
      state.list.filter((c) => c.id !== payload);
    },
  },
});

export const commentActions = commentSlice.actions;
export default commentSlice.reducer;
