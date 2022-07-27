// redux
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// axios
import instance from '../../shared/axios';
import { getCookie } from '../../shared/cookie';

export const setUserDB = createAsyncThunk('setUser', async () => {
  try {
    const response = await instance.get('/api/user/userInfo');
    const userInfo = response.data;
    console.log(userInfo);
    console.log('로그인 회원 정보 가져오기');
    return { userInfo };
  } catch (error) {
    console.log(error);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    info: {},
  },
  reducers: {},
  extraReducers: {
    [setUserDB.fulfilled]: (state, { payload }) => {
      state.info = payload.userInfo;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
