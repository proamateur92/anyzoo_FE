// react
import { useState } from 'react';

// style
import styled from 'styled-components';

// elements
import Wrap from '../elements/Wrap';
import UserTop from '../elements/UserTop';
import StepPhone from '../components/Step/StepPhone';

// sweetalert
import Swal from 'sweetalert2';

// axios
import instance from '../shared/axios';

// router
import { useNavigate } from 'react-router-dom';

const FindPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [userInfo, setUserInfo] = useState({ phoneNumber: '', password: '' });
  const [validation, setValidation] = useState({ phoneNumber: false, password: false });
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isDuplicated, setIsDuplicated] = useState({ phoneNumber: true });
  const [phoneMessage, setPhoneMessage] = useState(false);
  const [authMessage, setAuthMessage] = useState(false);
  const [isSendCode, setIsSendCode] = useState(false);
  const userInfoArr = ['phoneNumber', 'password'];
  const curData = userInfoArr[step];

  const handleSetPhoneMessage = (value) => {
    setPhoneMessage(value);
  };

  // 핸드폰으로 코드 받기
  const sendCode = async () => {
    console.log('코드 발급 함수 실행');
    try {
      const response = await instance.get(`/user/send/phoneVerification/${userInfo.phoneNumber}`);
      Swal.fire({
        title: '인증번호를 발송했어요!',
        icon: 'success',
        confirmButtonText: '확인',
        confirmButtonColor: '#44DCD3',
      });
      console.log(response.data);
      setIsSendCode(true);
      setAuthMessage(false);
    } catch (error) {
      console.log(error);
    }
  };

  // 사용자 입력 중복체크
  const handleInputDuplicated = async () => {
    if (curData === 'phoneNumber') {
      console.log('번호 중복 체크');
      try {
        const response = await instance.get(`/user/checkPhoneNumber/${userInfo.phoneNumber}`);
        console.log(response.data);
        if (response.data) {
          setIsDuplicated({ ...isDuplicated, [curData]: response.data });
          return;
        }
        setIsDuplicated({ ...isDuplicated, [curData]: response.data });
        setIsSendCode(true);
        sendCode();
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 유효성 검사 함수
  const checkValidation = (value) => {
    let regExp = '';

    switch (curData) {
      case 'password': {
        regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
        break;
      }
      case 'phoneNumber': {
        regExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{5})$/;
        break;
      }
      default: {
        return;
      }
    }

    const result = regExp.test(value);
    setValidation({ ...validation, [curData]: result });
  };

  // 입력 값 유저 정보 state에 넣기
  const handleEnteredInfo = async (event) => {
    // 숫자 이외의 값 입력 방지
    if (curData === 'phoneNumber') {
      if (isNaN(Number(event.target.value))) {
        return;
      }
    }

    // 별명, 이메일, 핸드폰 번호 중복 여부 갱신
    if (curData === 'phoneNumber') {
      setIsDuplicated({ ...isDuplicated, [curData]: false });
      if (curData === 'phoneNumber') {
        setIsDuplicated({ ...isDuplicated, [curData]: false });
        setIsAuthorized(false);
        setPhoneMessage(false);
        setAuthMessage(false);
        setIsSendCode(false);
      }
    }

    // img 외의 값 유효성 검사
    checkValidation(event.target.value);
    setUserInfo({ ...userInfo, [curData]: event.target.value });
  };

  // 인증코드 입력
  const [authNumber, setAuthNumber] = useState('');

  // 인증번호 입력 값
  const handleSetAuthNumber = (event) => {
    setAuthNumber(event.target.value);
  };

  let content = '';
  let buttons = '';

  if (step === 0) {
    content = (
      <StepPhone
        step={step}
        text='비밀번호를 잊으셨나요? 걱정하지마세요.'
        userPhoneNumber={userInfo[curData]}
        validation={validation[curData]}
        isDuplicated={isDuplicated[curData]}
        authMessage={authMessage}
        phoneMessage={phoneMessage}
        setPhoneMessage={handleSetPhoneMessage}
        handleInputDuplicated={handleInputDuplicated}
        setEnteredPhoneNumber={handleEnteredInfo}
        setAuthNumber={handleSetAuthNumber}
        authNumber={authNumber}
      />
    );
    buttons = (
      <ButtonBox step={step} width='100%' validation={isAuthorized}>
        <NextBtn onClick={() => isAuthorized && setStep(1)}>다음</NextBtn>
      </ButtonBox>
    );
  }

  // if (step === 1) {
  //   content = (
  //     <StepPhone
  //       userPhoneNumber={userInfo[curData]}
  //       validation={validation[curData]}
  //       isDuplicated={isDuplicated[curData]}
  //       authMessage={authMessage}
  //       phoneMessage={phoneMessage}
  //       setPhoneMessage={handleSetPhoneMessage}
  //       handleInputDuplicated={handleInputDuplicated}
  //       setEnteredPhoneNumber={handleEnteredInfo}
  //       setAuthNumber={handleSetAuthNumber}
  //       authNumber={authNumber}
  //     />
  //   );
  //   buttons = (
  //     <ButtonBox step={step} width='100%' validation={isAllAgree}>
  //       <NextBtn onClick={() => isAllAgree && handleStepMove(1)}>다음</NextBtn>
  //       {/* <NextBtn onClick={() => handleStepMove(1)}>다음</NextBtn> */}
  //     </ButtonBox>
  //   );
  // }

  return (
    <Wrap>
      <FindForm>
        <UserTop title='비밀번호 재설정' />
        <Container>
          {content}
          {buttons}
        </Container>
      </FindForm>
    </Wrap>
  );
};

const FindForm = styled.form`
  width: 95%;
  margin: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 20vw;
  /* padding: 0 16.5%; */
  /* background-color: blue; */
`;

const PrevBtn = styled.button``;
const NextBtn = styled.button``;
const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    width: 47%;
    padding: 15px;
    background-color: #ccc;
    border-radius: 10px;
    font-weight: 800;
    color: #333333;
  }
  ${PrevBtn} {
    transition: 0.5s;
    background-color: #f2f2f2;
  }
  ${PrevBtn}:hover {
    background-color: ${(props) => props.theme.color.activeBtn};
  }
  ${NextBtn} {
    width: ${(props) => props.width};
    background-color: ${(props) => (props.validation ? props.theme.color.activeBtn : props.theme.color.inactiveBtn)};
    cursor: ${(props) => props.validation && 'pointer'};
    transition: 0.5s;
  }
`;

export default FindPassword;
