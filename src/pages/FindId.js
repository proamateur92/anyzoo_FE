// react
import { useState } from 'react';

// style
import styled from 'styled-components';

// elements
import Wrap from '../elements/Wrap';

// axios
import instance from '../shared/axios';

const FindId = () => {
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState('');

  const handleSetPhoneNumber = (event) => {
    setEnteredPhoneNumber(event.target.value);
  };

  const handleFindId = async (event) => {
    console.log('핸드폰 번호 찾기');
    event.preventDefault();
    const phoneNumber = enteredPhoneNumber;

    try {
      const response = await instance.get('/user/find/lostEmail', { phoneNumber });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    setEnteredPhoneNumber('');
  };

  return (
    <Wrap>
      <FindForm>
        <span>아이디찾기</span>
        <input
          value={enteredPhoneNumber}
          onChange={handleSetPhoneNumber}
          type='text'
          placeholder="'-'없이 입력해주세요."
        />
        <button onClick={handleFindId}>계정 정보 확인</button>
      </FindForm>
    </Wrap>
  );
};

const FindForm = styled.form`
  display: flex;
  flex-direction: column;
`;
export default FindId;
