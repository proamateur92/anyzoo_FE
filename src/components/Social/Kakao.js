// style
import styled from 'styled-components';
import logo from '../../assets/images/kakao.png';

const REST_API_KEY = process.env.REACT_APP_KAKAO_API;
const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const Kakao = () => {
  return (
    <>
      <Link href={KAKAO_AUTH_URL}>
        <div>
          <img src={logo} alt='logo' />
          <span>카카오 로그인</span>
        </div>
      </Link>
    </>
  );
};

const Link = styled.a`
  position: relative;
  span {
    margin-left: 18%;
    font-size: 16px;
    font-weight: 800;
    color: #000000;
  }
  img {
    position: absolute;
    margin-top: 1%;
    left: 29%;
    width: 6%;
    height: 28%;
  }
`;

export default Kakao;
