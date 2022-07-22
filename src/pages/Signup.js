// element
import Wrap from '../elements/Wrap';
// import UserTop from '../elements/UserTop';

// icon
import { IoIosArrowBack } from 'react-icons/io';

// compoenents
import Step from '../components/Step/Step';

// react
import { useEffect, useState } from 'react';

// router
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// axios
import instance, { setAccessToken } from '../shared/axios';

// redux
import { useDispatch } from 'react-redux';

// cookie
import { getCookie, setCookie } from '../shared/cookie';

// store
import { setUserDB } from '../redux/modules/userSlice';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const isLogin = getCookie('accessToken') ? true : false;

  useEffect(() => {
    if (isLogin) navigate('/');
  });

  const handleCoutValue = (num) => {
    setStep((prev) => prev + num);
  };

  const handleSignup = async (userData) => {
    try {
      console.log('회원정보');
      console.table(userData);
      const response = await instance.post('/user/signup', userData);
      alert(response.data.msg);
      setCookie('accessToken', response.data.data.token.accessToken);
      setCookie('refreshToken', response.data.data.token.refreshToken);
      setAccessToken();
      dispatch(setUserDB());
      navigate('/');
      return;
    } catch (error) {
      alert(error);
    }
    navigate('/signup');
  };

  return (
    <Wrap>
      <SignupForm>
        {/* <UserTop title='회원가입' type='signup' /> */}
        <Top>
          <IoIosArrowBack style={{ cursor: 'pointer' }} onClick={() => navigate('/')} />
          <span>{`${step + 1}/6`}</span>
        </Top>
        <Step step={step} onCountChange={handleCoutValue} onSignup={handleSignup} />
      </SignupForm>
    </Wrap>
  );
};

const SignupForm = styled.div`
  margin: 5% 5% 0 5%;
  height: 100%;
`;

const Top = styled.div`
  display: flex;
  font-size: 20px;
  height: 20vw;
  justify-content: space-between;
`;

export default Signup;
