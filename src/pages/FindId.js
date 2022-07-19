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

const FindId = () => {
  const navigate = useNavigate();
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState('');

  const handleSetPhoneNumber = (event) => {
    setEnteredPhoneNumber(event.target.value);
  };

  const handleFindId = async (event) => {
    console.log('이메일 계정 찾기');
    event.preventDefault();
    const phoneNumber = enteredPhoneNumber;
    console.log(phoneNumber);

    try {
      const response = await instance.get(`/user/find/lostEmail/${phoneNumber}`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setEnteredPhoneNumber('');
  };

  return (
    <Wrap>
      <FindForm>
        <Top>
          <IoIosArrowBack
            style={{ position: 'absolute', cursor: 'pointer', left: '2%', fontSize: '25px' }}
            onClick={() => navigate('/login')}
          />
          <span>이메일 찾기</span>
        </Top>
        <Container>
          <Text>
            <span>이메일 계정을 잊으셨나요?</span>
            <span>ANYZOO 가입 시 입력한 휴대폰 번호를 입력해주세요.</span>
          </Text>
          <InputBox>
            <span>휴대폰 번호</span>
            <input
              value={enteredPhoneNumber}
              onChange={handleSetPhoneNumber}
              type='text'
              placeholder="'-'없이 입력해주세요."
            />
          </InputBox>
          <button onClick={handleFindId}>계정 정보 확인</button>
        </Container>
      </FindForm>
    </Wrap>
  );
};

const FindForm = styled.form`
  height: 80vh;
  background-color: blue;
`;

const Top = styled.div`
  position: relative;
  align-items: center;
  padding: 4.5% 0 11.6% 0;
  font-size: 20px;
  font-weight: 800;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 70%;
  padding: 0 17.9%;
  background-color: red;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  span:first-of-type {
    display: block;
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 2%;
  }
  span:nth-of-type(2) {
    font-size: 12px;
    margin-bottom: 10%;
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  span {
    font-size: 12px;
  }
  input {
    height: 17.9%;
  }
`;
export default FindId;
