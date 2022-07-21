import styled from "styled-components";
import KakaoLogin from 'react-kakao-login';

const buttonBlock = {
  border: "none",
  borderRadius: "9px",
  fontSize: "17px",
  width: "284px",
  fontWeight: "500",
  height: "32px",
  cursor: "pointer",
  background: "#fae101",
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  padding: "4px 0px",
};

const CLIENT_ID = process.env.REACT_APP_API_KAKAO;
const KakaoButton = () => {

	return(

		<KakaoLogin
		// token={}
		style={buttonBlock}>
		<ButtonInnerText>카카오로 로그인</ButtonInnerText>
	</KakaoLogin>
		)
}

const ButtonInnerText = styled.span``;

export default KakaoButton;