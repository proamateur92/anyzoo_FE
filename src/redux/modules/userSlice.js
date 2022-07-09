// redux
import { createSlice } from '@reduxjs/toolkit';

// axios
import instance from '../../shared/axios';

export const setUserDB = () => {
  return async function (dispatch) {
    try {
      // 토큰 값으로 해당 유저 정보 받아오기
      const response = await instance.get('/user/userInfo');
      dispatch(setUser(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    list: [],
    isLogin: false,
  },
  reducers: {
    // 예시
    // changeName: (state, action) => {
    //   state.name = action.payload;
    // },
    setUser: (state, action) => {
      console.log('유저정보 state에 넣기');
      console.log(action.payload);
      // state.isLogin = true;
      state.list = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
