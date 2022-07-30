// style
import styled from "styled-components";
import logo from "../../assets/images/google.png";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email&userinfo.profile`;

const Google = () => {
  return (
    <Link href={GOOGLE_AUTH_URL}>
      <div>
        <img src={logo} alt="logo" />
        <span>구글 로그인</span>
      </div>
    </Link>
  );
};

const Link = styled.a`
  position: relative;
  span {
    margin-left: 12%;
    font-size: 1.6rem;
    font-weight: 800;
    color: #000000;
  }
  img {
    position: absolute;
    left: 27%;
    bottom: 28%;
    width: 10%;
    height: 40%;
  }
`;

export default Google;
