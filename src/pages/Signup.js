// element
import Wrap from '../elements/Wrap';

// icon
import { IoIosArrowBack } from 'react-icons/io';

// compoenents
import Step from '../components/Step';

// react
import { useState } from 'react';

// router
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// axios
import axios from 'axios';
import instance from '../shared/axios';

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const handleCoutValue = num => {
    setStep(prev => prev + num);
  };

  const handleSignup = async userData => {
    try {
      const response = await instance.post('/user/signup', { ...userData });
      // const response = await axios.post('http://localhost:5000/user', { ...userData });
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.log(error);
      navigate('/signup');
    }
  };

  return (
    <Wrap>
      <SignupForm>
        <IoIosArrowBack
          size={30}
          style={{ padding: '83px 0 100px 30px', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        />
        <Step step={step} onCountChange={handleCoutValue} onSignup={handleSignup} />
      </SignupForm>
    </Wrap>
  );
};

const SignupForm = styled.div``;
export default Signup;
