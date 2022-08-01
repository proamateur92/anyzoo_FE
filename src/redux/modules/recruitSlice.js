//redux-toolkit
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//axios
import instance from "../../shared/axios";

// sweetalert
import Swal from "sweetalert2";

// 리스트 불러오기
export const loadPostsDB = createAsyncThunk("recruit/loadPost", async (pageInfo) => {
  const url =
    pageInfo.provinceId === "all" || pageInfo.cityId === "all"
      ? "/api/together"
      : "/api/together/category/" + pageInfo.provinceId;

  const response = await instance.get(`${url}?page=${pageInfo.page}`).catch((err) => console.log(err));
  return response.data;
});

// 글 작성
export const addDataDB = createAsyncThunk("addData", async (data) => {
  const response = await instance
    .post("/api/together", data)
    .then((res) => {
      Swal.fire({
        title: "추가되었습니다",
        icon: "success",
        confirmButtonText: "확인",
        confirmButtonColor: "#44DCD3",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.replace("/together");
        }
      });
    })
    .catch((err) => console.log(err));
  const newPoster = { ...data, boardmainId: response.data.boardMainId };
  return newPoster;
});

// 글 수정
export const modifyDataDB = createAsyncThunk("modifyData", async (newData) => {
  console.log(newData.data, "data", newData.id, "id");
  await instance
    .patch("/api/together/detail/" + newData.id, newData.data)
    .then((res) => {
      Swal.fire({
        title: "수정되었습니다",
        icon: "success",
        confirmButtonText: "확인",
        confirmButtonColor: "#44DCD3",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.replace("/together");
        }
      });
    })
    .catch((err) => console.log(err));
  return newData;
});

// 글 삭제
export const removeDataDB = createAsyncThunk("removeData", async (id) => {
  await instance.delete("/api/together/detail/" + id);
  Swal.fire({
    title: "삭제되었습니다",
    icon: "success",
    confirmButtonText: "확인",
    confirmButtonColor: "#44DCD3",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.replace("/together");
    }
  });
  return id;
});

//Reducer
const postSlice = createSlice({
  name: "together",
  initialState: {
    list: [],
    pageNumber: 0,
    isLast: false,
  },

  extraReducers: {
    //불러오기
    [loadPostsDB.fulfilled]: (state, { payload }) => {
      if (payload.pageable.pageNumber === 0) {
        state.list = [...payload.content];
      } else {
        state.list = [...state.list, ...payload.content];
      }
      state.pageNumber = payload.pageable.pageNumber;
      state.last = payload.isLast;
    },

    //추가하기
    [addDataDB.fulfilled]: (state, { payload }) => {
      state.list.push(payload);
    },

    //수정하기
    [modifyDataDB.fulfilled]: (state, { payload }) => {
      state.list.map((post) => {
        console.log(payload, "무야야");
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
