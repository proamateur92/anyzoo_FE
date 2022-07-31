// redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// axios
import instance from "../../shared/axios";

export const setUserDB = createAsyncThunk("setUserImage", async () => {
  try {
    const response = await instance.get("/api/user/userInfo");
    const userInfo = response.data;
    return { userInfo };
  } catch (error) {
    console.log(error);
  }
});

export const setFollowingListDB = createAsyncThunk("setFollowingList", async (targetNickname) => {
  try {
    const response = await instance.get(`/api/following/${targetNickname}`);
    const followingList = response.data.map((f) => f.nickname);
    return { followingList };
  } catch (error) {
    console.log(error);
  }
});

export const addFollowingListDB = createAsyncThunk("addFollowingList", async (userNickname) => {
  return { userNickname };
});

export const removeFollowingListDB = createAsyncThunk("removeFollowingList", async (userNickname) => {
  return { userNickname };
});

export const updateUserImageDB = createAsyncThunk("updateUserImage", async (userInfo) => {
  const userImage = userInfo.userImage;
  return { userImage };
});

export const updateUserNicknameDB = createAsyncThunk("updateUserNickname", async (userInfo) => {
  const userNickname = userInfo.nickname;
  return { userNickname };
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    info: {},
    followingList: [],
  },
  reducers: {},
  extraReducers: {
    [setUserDB.fulfilled]: (state, { payload }) => {
      state.info = payload.userInfo;
    },
    [setFollowingListDB.fulfilled]: (state, { payload }) => {
      state.followingList = payload.followingList;
    },
    [addFollowingListDB.fulfilled]: (state, { payload }) => {
      state.followingList.push(payload.userNickname);
    },
    [removeFollowingListDB.fulfilled]: (state, { payload }) => {
      state.followingList = state.followingList.filter((nickname) => nickname !== payload.userNickname);
    },
    [updateUserImageDB.fulfilled]: (state, { payload }) => {
      state.info = { ...state.info, img: payload.userImage };
    },
    [updateUserNicknameDB.fulfilled]: (state, { payload }) => {
      state.info = { ...state.info, nickname: payload.userNickname };
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
