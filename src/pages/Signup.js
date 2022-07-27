// react
import { useEffect, useState } from 'react';

// element
import Wrap from '../elements/Wrap';
import UserTop from '../elements/UserTop';

// compoenents
import Step from '../components/Step/Step';

// sweetalert
import Swal from 'sweetalert2';

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
  const [progress, isProgress] = useState(0);
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
      setCookie('accessToken', response.data.data.token.accessToken);
      setCookie('refreshToken', response.data.data.token.refreshToken);
      setAccessToken();
      dispatch(setUserDB());
      navigate('/');
      return;
    } catch (error) {
      Swal.fire({
        title: '회원가입에 실패했어요.',
        icon: 'error',
        confirmButtonText: '확인',
        confirmButtonColor: '#44DCD3',
      });
    }
    navigate('/signup');
  };

  useEffect(() => {
    isProgress(Math.round(((step + 1) / 6) * 100));
  }, [step]);
  return (
    <Wrap>
      <UserTop title='회원가입' type='signup' percentage={progress} />
      <SignupForm>
        <Step step={step} onCountChange={handleCoutValue} onSignup={handleSignup} />
      </SignupForm>
    </Wrap>
  );
};

const SignupForm = styled.div`
  margin: 5% 5% 0 5%;
  height: 100%;
`;

export default Signup;
