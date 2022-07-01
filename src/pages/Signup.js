// element
import Wrap from '../elements/Wrap';

// icon
import { IoIosArrowBack } from 'react-icons/io';

// compoenents
import Step from '../components/Step';

// react
import { useState } from 'react';

const Signup = () => {
  const [step, setStep] = useState(0);

  // 각 스텝마다 유저정보 저장할 state필요

  const handleCoutValue = () => {
    setStep(prev => prev + 1);
  };

  return (
    <Wrap>
      <div>
        <IoIosArrowBack size={30} style={{ padding: '83px 0 90px 30px', cursor: 'pointer' }} />
      </div>
      <Step step={step} onCountChange={handleCoutValue} />
    </Wrap>
  );
};

export default Signup;
