import axios from 'axios';
import { getStorage } from './storage';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
});

// 가지고 있는 토큰 넣어주기!
// 로그인 전이면 토큰이 없으니 못 넣어요.
// 그럴 땐 로그인 하고 토큰을 받아왔을 때 넣어줍시다.

const token = getStorage();

if (token) {
  instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

// 인터셉터 내용 필요

export default instance;
