// react
import { useState } from 'react';

// style
import styled from 'styled-components';

// elements
import Wrap from '../elements/Wrap';

// axios
import instance from '../shared/axios';

// icon
import { IoIosArrowBack } from 'react-icons/io';

// router
import { useNavigate } from 'react-router-dom';

const FindPassword = () => {
  const navigate = useNavigate();
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState('');

  const handleSetPhoneNumber = (event) => {
    setEnteredPhoneNumber(event.target.value);
  };

  const [enteredPassword, setEnteredPassword] = useState('');

  const handleSetPassword = (event) => {
    setEnteredPassword(event.target.value);
  };

  const handleNewPassword = async () => {
    console.log('새 비밀번호 설정');

    console.log('핸드폰번호');
    console.log(enteredPhoneNumber);

    console.log('비밀번호');
    console.log(enteredPassword);

    try {
      const response = await instance.post('/user/make/newPassword', {
        phoneNumber: enteredPhoneNumber,
        newPassword: enteredPassword,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Wrap>
      <FindForm>
        <Top>
          <IoIosArrowBack style={{ cursor: 'pointer' }} onClick={() => navigate('/login')} />
          <span>비밀번호 재설정</span>
        </Top>
        <div>
          <span>비밀번호를 잊어도 걱정하지 마세요</span>
        </div>
        <input
          value={enteredPhoneNumber}
          onChange={handleSetPhoneNumber}
          type='text'
          placeholder="'-'없이 입력해주세요."
        />
        <input
          value={enteredPassword}
          onChange={handleSetPassword}
          type='password'
          placeholder='비밀번호를 입력하세요.'
        />
        {/* <input type='password' placeholder='' /> */}
        <button onClick={handleNewPassword}>인증완료</button>
      </FindForm>
    </Wrap>
  );
};

const Top = styled.div``;

const FindForm = styled.div`
  display: flex;
  flex-direction: column;
`;

export default FindPassword;
