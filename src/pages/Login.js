// react
import { useEffect, useRef } from 'react';

// element
import Wrap from '../elements/Wrap';

// style
import styled from 'styled-components';

// sweetalert
import Swal from 'sweetalert2';

// router
import { useNavigate } from 'react-router-dom';

// axios
import instance, { setAccessToken } from '../shared/axios';

// cookie
import { getCookie, setCookie } from '../shared/cookie';

// userSlice
import { setUserDB } from '../redux/modules/userSlice';

// redux
import { useDispatch } from 'react-redux';

// google
import Google from '../components/Social/Google';
import Kakao from '../components/Social/Kakao';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogin = getCookie('accessToken') ? true : false;
  console.log(isLogin);

  useEffect(() => {
    if (isLogin) navigate('/');
  });

  const eamilValue = useRef('');
  const pwdValue = useRef('');

  const login = async (userInfo) => {
    try {
      const response = await instance.post('/user/login', userInfo);
      setCookie('accessToken', response.data.data.token.accessToken);
      setCookie('refreshToken', response.data.data.token.refreshToken);
      setAccessToken();
      navigate('/');
      dispatch(setUserDB());
    } catch (error) {
      Swal.fire({
        title: `${error.response.data.errorMessage}`,
        icon: 'warning',
        confirmButtonText: '확인',
        confirmButtonColor: '#44DCD3',
      });
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
            <div className='findInfo' onClick={() => navigate('/user/findId')}>
              <span>이메일 찾기</span>
            </div>
            <div className='findInfo'>|</div>
            <div className='findInfo' onClick={() => navigate('/user/findPassword')}>
              <span>비밀번호 찾기</span>
            </div>
          </FindInfo>
          <SimpleLogin>
            <span className='simple'>간편 로그인</span>
            <SocialButtons>
              <Google />
              <Kakao />
            </SocialButtons>
          </SimpleLogin>
        </LoginForm>
      </Container>
    </Wrap>
  );
};

const Container = styled.div`
  text-align: center;
  height: 100%;
`;

const Logo = styled.span`
  display: inline-block;
  font-size: 30px;
  font-weight: 800;
  color: ${(props) => props.theme.color.main};
  padding: 15% 0;
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
    padding: 7%;
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
  button {
    padding: 7%;
    font-size: 16px;
    font-weight: 800;
    border-radius: 12px;
    border: none;
    outline: none;
    cursor: pointer;
  }
`;

const FindInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10%;
  margin: 5% 0;
  font-size: 16px;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.3);
  .findInfo:nth-of-type(2) {
    font-size: 14px;
  }
  .findInfo:not(:nth-of-type(2)):hover {
    color: ${(props) => props.theme.color.main};
    font-weight: 800;
    cursor: pointer;
  }
`;

const Buttons = styled.div`
  display: flex;
  width: 100%;
  height: 15%;
  flex-direction: column;
  margin: 7% 0 5% 0;
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
  padding: 20px 0 15px 0;
  width: 100%;
  .simple {
    font-size: 14px;
    font-weight: 800;
    margin: 2% 0;
    color: rgba(0, 0, 0, 0.4);
  }
`;

const SocialButtons = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  a {
    width: 100%;
    padding: 7%;
    box-shadow: 2px 1px 10px 1px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
  }
  a:first-of-type {
    margin: 3% 0;
    background-color: #ffffff;
  }
  a:nth-of-type(2) {
    background-color: #fee500;
  }
`;

export default Login;
