// element
import Wrap from '../elements/Wrap';

// style
import styled from 'styled-components';

const Login = () => {
  return (
    <Wrap>
      <Container>
        <Logo>로고</Logo>
        <LoginForm>
          <input className='username' type='text' placeholder='이메일' />
          <input className='password' type='password' placeholder='비밀번호' />
          <Buttons>
            <button className='login-btn'>로그인</button>
            <button className='signup-btn'>회원가입</button>
          </Buttons>
          <div className='findPwd'>비밀번호 찾기</div>
          <SimpleLogin>
            <span>간편 로그인</span>
            <SocialButtons>
              <div className='naver'>네이버</div>
              <div className='google'>구글</div>
              <div className='kakao'>카카오</div>
            </SocialButtons>
          </SimpleLogin>
        </LoginForm>
      </Container>
    </Wrap>
  );
};

const Container = styled.div`
  height: 100%;
  padding-top: 78px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  input,
  button {
    width: 226px;
    height: 50px;
    border-radius: 10px;
    border: none;
    outline: none;
    font-size: inherit;
  }
  input:first-of-type,
  button:first-of-type {
    margin-bottom: 5px;
  }
  input {
    background-color: #ccc;
  }
  button {
    cursor: pointer;
  }
  .findPwd {
    margin-bottom: 91px;
  }
`;

const Logo = styled.div`
  width: 86px;
  height: 36px;
  margin-bottom: 73px;
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0 20px 0;
`;

const SimpleLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 255px;
  padding: 20px 0 15px 0;
  border-top: 1px solid #ccc;
  span {
    font-size: 14px;
  }
`;
const SocialButtons = styled.div`
  display: flex;
  margin-top: 15px;
  div {
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 50%;
    font-size: 12px;
    cursor: pointer;
    background-color: #ccc;
  }
  .google {
    margin: 0 12px;
  }
`;
export default Login;
