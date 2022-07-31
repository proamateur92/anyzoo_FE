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

export const updateUserImageDB = createAsyncThunk("updateUserImage", async (userInfo) => {
  const userImage = userInfo.userImage;
  return { userImage };
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    info: {},
  },
  reducers: {},
  extraReducers: {
    [setUserDB.fulfilled]: (state, { payload }) => {
      state.info = payload.userInfo;
    },
    [updateUserImageDB.fulfilled]: (state, { payload }) => {
      state.info = { ...state.info, userImage: payload.userImage };
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
