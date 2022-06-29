import { createSlice } from '@reduxjs/toolkit';
// import instance from '../../shared/axios';

// 예시
export const loadUserDB = userData => {
  return async function (dispatch) {
    try {
      dispatch(loadUser(userData));
    } catch (error) {
      console.log(error);
    }
  };
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    list: [],
  },

  reducers: {
    // 예시
    // changeName: (state, action) => {
    //   state.name = action.payload;
    // },
    addUser: (state, action) => {
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
export const { addUser, loadUser } = userSlice.actions;
export default userSlice.reducer;
