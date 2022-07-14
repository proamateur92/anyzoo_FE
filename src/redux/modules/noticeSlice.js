import { createSlice } from '@reduxjs/toolkit';
// import instance from '../../shared/axios';

// 예시
const noticeSlice = createSlice({
  name: 'loadNotice',
  initialState: {
    list: [
      {
        id:1,
        url: '/',
        img:'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcOraWH%2FbtrGaJclSXN%2FGrJANxFBQGKNzizjQdX6uk%2Fimg.png'
      },
      {
        id:2,
        url: '/',
        img:'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbJE81B%2FbtrF8SnRDWE%2FBGNScIhtK3jPSgDYdAgKtK%2Fimg.png'
      },
      {
        id:3,
        url: '/',
        img:'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F9dWUW%2FbtrGbeXt6IM%2FEkJi6kgkkJMSYAOHsQVJck%2Fimg.png'
      }
    ],
  },

  reducers: {
    loadNotice: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const noticeActions = noticeSlice.actions;
export const { loadNotice } = noticeSlice.actions;
export default noticeSlice.reducer;
