import { createSlice } from '@reduxjs/toolkit';
import instance from '../../shared/axios';

export const setUserDB = () => {
  return async function (dispatch) {
    try {
      // 토큰 값으로 해당 유저 정보 받아오기
      console.log('로그인');
      const response = await instance.get('/user/userInfo');
      console.log(response.data);
      // dispatch(setUser(response));
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
      console.log(action.payload);
      state.list = action.payload;
    },
    loadUser: (state, action) => {
      // console.log(action.payload);
      state.list = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export const { setUser, loadUser } = userSlice.actions;
export default userSlice.reducer;
