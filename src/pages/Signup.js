// element
import Wrap from '../elements/Wrap';

// icon
import { IoIosArrowBack } from 'react-icons/io';

// compoenents
import Step from '../components/Step/Step';

// react
import { useState } from 'react';

// router
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// axios
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
      alert(response.data.msg);
      navigate('/');
      return;
    } catch (error) {
      console.log(error);
    }
    navigate('/signup');
  };

  return (
    <Wrap>
      <SignupForm>
        <Top>
          <IoIosArrowBack style={{ cursor: 'pointer' }} onClick={() => navigate('/')} />
          <span>{`${step + 1}/5`}</span>
        </Top>
        <Step step={step} onCountChange={handleCoutValue} onSignup={handleSignup} />
      </SignupForm>
    </Wrap>
  );
};

const Top = styled.div`
  display: flex;
  font-size: 30px;
  padding: 83px 0 100px 0;
  justify-content: space-between;
`;

const SignupForm = styled.div`
  padding: 0 10%;
`;

export default Signup;
