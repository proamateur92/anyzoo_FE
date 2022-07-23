import styled from "styled-components";

const REST_API_KEY = process.env.REACT_APP_KAKAO_API;
const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const Kakao = () => {
	return(
    <a href={KAKAO_AUTH_URL}>카카오로그인</a>
		)
}

export default Kakao;