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
  const [username, setUsername] = useState({ isShow: false, result: '' });

  // 핸드폰 번호 사용자 입력
  const handleSetPhoneNumber = (event) => {
    setUsername({ isShow: false, result: '' });
    setEnteredPhoneNumber(event.target.value);
  };

  // 계정 정보 받아오기
  const handleFindId = async (event) => {
    console.log('이메일 계정 찾기');
    event.preventDefault();

    const phoneNumber = enteredPhoneNumber;
    console.log(phoneNumber);

    try {
      const response = await instance.get(`/user/find/lostEmail/${phoneNumber}`);
      console.log(response.data);
      setUsername({ isShow: true, result: response.data });
    } catch (error) {
      console.log(error);
    }
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
          {username.isShow && (
            <InputBox>
              <span>이메일 계정 확인</span>
              <span>{username.result}</span>
            </InputBox>
          )}
          <button onClick={handleFindId}>계정 정보 확인</button>
        </Container>
      </FindForm>
    </Wrap>
  );
};

const FindForm = styled.form`
  margin-top: 5%;
  input,
  button {
    width: 100%;
    padding: 15px;
    background-color: ${(props) => props.theme.color.grey};
    border-radius: 10px;
    margin-bottom: 5vw;
    font-size: 16px;
  }
  button {
    font-weight: 800;
    background-color: ${(props) => props.theme.color.main};
  }
`;

const Top = styled.div`
  position: relative;
  align-items: center;
  font-size: 20px;
  font-weight: 800;
  text-align: center;
  height: 20vw;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 20vw;
  padding: 0 16.5%;
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
  span:first-of-type {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 2vw;
  }
  span:nth-of-type(2) {
    font-size: 16px;
    font-weight: 800;
    margin-left: 3%;
    margin-bottom: 10vw;
  }
`;

export default FindId;
