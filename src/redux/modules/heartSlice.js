import { createSlice } from '@reduxjs/toolkit';
// import instance from '../../shared/axios';

// 예시
export const loadHeartDB = heartData => {
  return async function (dispatch) {
    try {
      dispatch(loadHeart(heartData));
    } catch (error) {
      console.log(error);
    }
  };
};

const heartSlice = createSlice({
  name: 'heart',
  initialState: {
    list: [],
  },

  reducers: {
    // 예시
    // changeName: (state, action) => {
    //   state.name = action.payload;
    // },
    addHeart: (state, action) => {
      console.log(action.payload);
      state.list = action.payload;
    },
    loadHeart: (state, action) => {
      // console.log(action.payload);
      state.list = action.payload;
    },
  },
});

export const heartActions = heartSlice.actions;
export const { addHeart, loadHeart } = heartSlice.actions;
export default heartSlice.reducer;
