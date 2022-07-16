// element
import Wrap from '../elements/Wrap';

// style
import styled from 'styled-components';

// react
import { useRef } from 'react';

// router
import { useNavigate } from 'react-router-dom';

// axios
import instance, { setAccessToken } from '../shared/axios';

// redux
import { useDispatch } from 'react-redux';

// storage
import { setUserDB } from '../redux/modules/userSlice';

// cookie
import { setCookie } from '../shared/cookie';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const eamilValue = useRef('');
  const pwdValue = useRef('');

  const login = async (userInfo) => {
    try {
      const response = await instance.post('/user/login', userInfo);
      setCookie('accessToken', response.data.data.token.accessToken);
      setCookie('refreshToken', response.data.data.token.refreshToken);
      alert(response.data.msg);
      setAccessToken();
      dispatch(setUserDB());
      navigate('/');
    } catch (error) {
      window.alert(error.response.data.errorMessage);
      navigate('/login');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = eamilValue.current;
    const password = pwdValue.current;

    if (email.value.trim().length === 0) {
      email.focus();
      return;
    }

    if (password.value.trim().length === 0) {
      password.focus();
      return;
    }

    // axios 통신
    const userInfo = { username: email.value, password: password.value };
    login(userInfo);

    email.value = '';
    password.value = '';
  };

  return (
    <Wrap>
      <Container>
        <Logo>ANYZOO</Logo>
        <LoginForm onSubmit={handleSubmit}>
          <input ref={eamilValue} className='username' type='text' placeholder='이메일' />
          <input ref={pwdValue} className='password' type='password' placeholder='비밀번호' />
          <Buttons>
            <button onClick={() => handleSubmit}>로그인</button>
            <button onClick={() => navigate('/signup')}>회원가입</button>
          </Buttons>
          <FindInfo>
            <div className='findInfo'>이메일 찾기</div>
            <div className='findInfo'>|</div>
            <div className='findInfo' onClick={() => navigate('/findinfo')}>
              비밀번호 찾기
            </div>
          </FindInfo>
          <SimpleLogin>
            <span>간편 로그인</span>
            <SocialButtons>
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
  text-align: center;
  height: 100vh;
`;

const Logo = styled.span`
  display: inline-block;
  font-size: 30px;
  font-weight: 800;
  color: ${(props) => props.theme.color.main};
  padding: 25% 0 15% 0;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16.5%;
  height: 100%;
  input {
    box-sizing: border-box;
    width: 100%;
    font-size: 16px;
    border-radius: 10px;
    padding: 15px;
    height: 6%;
    border: none;
    outline: none;
  }
  input:first-of-type {
    margin-bottom: 3%;
  }
  input {
    background-color: ${(props) => props.theme.color.grey};
  }
  input::placeholder {
    color: rgba(0, 0, 0, 0.3);
    text-align: center;
  }
`;

const FindInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10%;
  margin-bottom: 5%;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.3);
  .finInfo {
    flex: 1;
  }
`;

const Buttons = styled.div`
  display: flex;
  width: 100%;
  height: 15%;
  flex-direction: column;
  margin: 7% 0 5% 0;
  button {
    height: 40%;
    font-size: 16px;
    font-weight: 800;
    border-radius: 10px;
    border: none;
    outline: none;
    cursor: pointer;
  }
  button:first-of-type {
    margin-bottom: 3%;
    background-color: ${(props) => props.theme.color.main};
  }
  button:nth-of-type(2) {
    background-color: ${(props) => props.theme.color.lightgrey};
    color: rgba(0, 0, 0, 0.5);
  }
`;

const SimpleLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 255px;
  padding: 20px 0 15px 0;
  span {
    font-size: 14px;
    font-weight: 800;
    color: rgba(0, 0, 0, 0.4);
  }
`;

const SocialButtons = styled.div`
  display: flex;
  margin-top: 8%;
  div {
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 50%;
    font-size: 12px;
    cursor: pointer;
    background-color: ${(props) => props.theme.color.grey};
  }
  .google {
    margin: 0 12px;
  }
`;

export default Login;
