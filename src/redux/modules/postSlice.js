//redux-toolkit
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//axios
import instance from "../../shared/axios";

// sweetalert
import Swal from "sweetalert2";

// 자랑하기 글 불러오기
export const loadPostsDB = createAsyncThunk("post/loadPost", async (pageInfo) => {
  const response = await instance
    .get(`/api/post/category/${pageInfo.sorting}?page=${pageInfo.page}`)
    .catch((err) => console.log(err));
  // console.log(response)
  // const response = await axios.get('http://localhost:5000/post?page='+ pageNo).catch((err) => console.log(err))
  return response.data;
});

// 자랑하기 글 작성
export const addDataDB = createAsyncThunk("addData", async (data) => {
  console.log(data, "츄가");
  const response = await instance
    .post("/api/post", data)
    .then((res) => {
      Swal.fire({
        title: "추가되었습니다",
        icon: "success",
        confirmButtonText: "확인",
        confirmButtonColor: "#44DCD3",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.replace("/post");
        }
      });
    })
    .catch((err) => console.log(err));
  const newPoster = { ...data, boardmainId: response.data.boardMainId };
  return newPoster;
});

// 자랑하기 글 수정
export const modifyDataDB = createAsyncThunk("modifyData", async (newData) => {
  console.log(newData.data, "data", newData.id, "id");
  await instance
    .patch("/api/post/" + newData.id, newData.data)
    .then((res) => {
      Swal.fire({
        title: "수정되었습니다",
        icon: "success",
        confirmButtonText: "확인",
        confirmButtonColor: "#44DCD3",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.replace("/post");
        }
      });
    })
    .catch((err) => console.log(err));
  return newData;
});

// 자랑하기 글 삭제
export const removeDataDB = createAsyncThunk("removeData", async (id) => {
  await instance.delete("/api/post/" + id).then((res) => {
    Swal.fire({
      title: "삭제되었습니다",
      icon: "success",
      confirmButtonText: "확인",
      confirmButtonColor: "#44DCD3",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.replace("/post");
      }
    });
  });
  return id;
});

//Reducer
const postSlice = createSlice({
  name: "post",
  initialState: {
    list: [],
    pageNumber: 0,
    last: false,
  },

  extraReducers: {
    // 불러오기
    [loadPostsDB.fulfilled]: (state, { payload }) => {
      if (payload.pageable.pageNumber === 0) {
        state.list = [...payload.content];
      } else {
        state.list = [...state.list, ...payload.content];
      }
      state.pageNumber = payload.pageable.pageNumber;
      state.last = payload.last;
    },

    //추가하기
    [addDataDB.fulfilled]: (state, { payload }) => {
      state.list.push(payload);
    },

    //수정하기
    [modifyDataDB.fulfilled]: (state, { payload }) => {
      state.list.map((post) => {
        console.log(payload, "무 ㅓ야야야");
        if (post.id === payload.id) {
          return {
            ...post,
            payload,
          };
        } else {
          return post;
        }
      });
    },

    //삭제하기
    [removeDataDB.fulfilled]: (state, { payload }) => {
      state.list = state.list.filter((post) => {
        return (
          post.id !== payload // 받아온 id와 저장되어 있는 데이터의 id가 다르면 걸러라
        );
      });
    },
  },
});

export const postAction = postSlice.actions;
export const { setData, addData, removeData, modifyData } = postSlice.actions;
export default postSlice.reducer;
