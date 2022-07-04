// react
import { useState } from 'react';

// icon
import { AiFillEyeInvisible, AiFillEye, AiOutlineCheckCircle } from 'react-icons/ai';

// style
import styled from 'styled-components';

// image
import profile from '../assets/images/noProfile.png';

const Step = ({ step, onCountChange, onSignup }) => {
  // 유효성 검사 체크
  const [validation, setValidation] = useState({ nickname: false, username: false, password: false });

  // 유효성 검사 함수
  const checkValidation = value => {
    let regExp = '';

    if (curData === 'nickname') {
      regExp = /^[a-zA-Z가-힣][a-zA-Z가-힣0-9]{2,11}$/g;
    }

    if (curData === 'username') {
      regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    }

    if (curData === 'password') {
      regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    }
    // if (curData !== 'password') {
    //   const result = regExp.test(value);
    //   setValidation({ ...validation, [curData]: result });
    // }
    const result = regExp.test(value);
    setValidation({ ...validation, [curData]: result });
  };

  // 비밀번호 보이기, 안보이기
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [userInfo, setUserInfo] = useState({ nickname: '', username: '', password: '', img: '' });
  const [passwordCheckValue, setPasswordCheckValue] = useState('');

  const userInfoArr = ['nickname', 'username', 'password', 'img'];

  // 현재 입력될 input의 이름
  const curData = userInfoArr[step];

  // 이전에 입력된 input의 이름
  const prevData = userInfoArr[step - 1];

  // 입력 값 state에 넣기
  const handleEnteredInfo = event => {
    if (curData === 'img') {
      setUserInfo({ ...userInfo, [curData]: event.target.files[0].name });
      return;
    }

    checkValidation(event.target.value);
    setUserInfo({ ...userInfo, [curData]: event.target.value });
  };

  // 비밀번호 정규식 및 일치 여부
  const handleEnteredPwdCheck = event => {
    setPasswordCheckValue(event.target.value);
    // isSamePassword();
  };

  const isSamePassword = () => {
    const regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    // const result = regExp.test();

    // if (userInfo.password === passwordCheckValue) {
    //   setPasswordMatch(true);
    // } else {
    //   setPasswordMatch(false);
    // }
  };

  // 이전 단계, 다음 단계 이동
  const handleStepMove = moveStep => {
    if (moveStep === -1) {
      setUserInfo({ ...userInfo, [prevData]: '' });
      setValidation({ ...validation, [prevData]: false });
    }
    onCountChange(moveStep);
  };

  // 가입하기
  const singup = () => {
    onSignup(userInfo);
  };

  // step별 화면 보여주기
  let content = '';

  if (step === 0) {
    content = (
      <>
        <span className='desc'>
          <p>당신의</p>
          <p>
            <span className='strong'>별명</span>은?
          </p>
        </span>
        <input value={userInfo.nickname} onChange={handleEnteredInfo} type='text' placeholder='별명을 입력해주세요.' />
      </>
    );
  }

  if (step === 1) {
    content = (
      <>
        <span className='desc'>
          <p>
            <span className='strong'>이메일</span>을
          </p>
          <p>입력해주세요.</p>
        </span>
        <input
          value={userInfo.username}
          onChange={handleEnteredInfo}
          type='text'
          placeholder='이메일을 입력해주세요.'
        />
      </>
    );
  }

  if (step === 2) {
    content = (
      <>
        <span className='desc'>
          <p>
            <span className='strong'>비밀번호</span>를
          </p>
          <p>입력해주세요.</p>
        </span>
        <span className='notice'>* 대문자, 특수문자를 포함해주세요. (8~16글자)</span>
        <InputBox>
          <input
            value={userInfo.password}
            onChange={handleEnteredInfo}
            className='pwd'
            type={!isShowPassword ? 'password' : 'text'}
            placeholder='비밀번호를 입력해주세요.'
          />
          <Icon>
            {!isShowPassword && <AiFillEyeInvisible onClick={() => setIsShowPassword(true)} />}
            {isShowPassword && <AiFillEye onClick={() => setIsShowPassword(false)} />}
          </Icon>
        </InputBox>
        <InputBox>
          <input
            value={passwordCheckValue}
            onChange={handleEnteredPwdCheck}
            className='pwd-check'
            type='password'
            placeholder='비밀번호를 다시 입력해주세요.'
          />
          <Icon>
            <AiOutlineCheckCircle style={{ color: validation.password ? 'green' : 'red' }} />
          </Icon>
        </InputBox>
      </>
    );
  }

  if (step === 3) {
    content = (
      <>
        <span className='desc'>
          <p>마지막으로</p>
          <p>
            <span className='strong'>프로필이미지</span>를
          </p>
          <p>설정해주세요.</p>
        </span>
        <div>
          <img src={profile} alt='profile' style={{ borderRadius: '50%', width: '100px', height: '100px' }} />
          <input onChange={handleEnteredInfo} type='file' />
        </div>
      </>
    );
  }

  const buttons = (
    <ButtonBox step={step} validation={validation[curData]}>
      {step !== 0 && <button onClick={() => handleStepMove(-1)}>이전 단계</button>}
      {step < 3 && <NextBtn onClick={() => validation[curData] && handleStepMove(1)}>다음 단계</NextBtn>}
      {step === 3 && (
        <button step={step} onClick={() => singup()}>
          가입하기
        </button>
      )}
    </ButtonBox>
  );
  return (
    <Container>
      {content}
      {buttons}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 50px;
  .desc {
    display: block;
    font-size: 20px;
    margin-bottom: 48px;
  }
  .strong {
    font-weight: bold;
  }
  .notice {
    display: block;
    margin-bottom: 27px;
    font-size: 14px;
  }
  p {
    display: block;
    margin-bottom: 5px;
  }
  input {
    box-sizing: border-box;
    height: 55px;
    padding: 0 10px;
    font-size: 20px;
    border-bottom: 3px solid #ccc;
  }
  input:last-of-type {
    margin-bottom: 20px;
  }
  input::placeholder {
    font-size: 16px;
  }
`;

const InputBox = styled.div`
  position: relative;
  border-bottom: 3px solid #ccc;
  input {
    box-sizing: border-box;
    height: 55px;
    padding: 0 10px;
    font-size: 20px;
    border: none;
  }
  input:last-of-type {
    margin-bottom: 0;
  }
  input::placeholder {
    font-size: 16px;
    color: #ccc;
  }
  &:nth-of-type(2) {
    margin-bottom: 20px;
  }
`;

const Icon = styled.div`
  position: absolute;
  font-size: 20px;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const NextBtn = styled.button``;
const ButtonBox = styled.div`
  display: flex;
  justify-content: ${props => (props.step === 0 ? 'flex-end' : 'space-between')};
  button {
    font-size: 16px;
    width: 130px;
    height: 50px;
    background-color: #ccc;
    border-radius: 10px;
  }
  ${NextBtn} {
    background-color: ${props => (props.validation ? '#949494' : '#bdbdbd')};
    cursor: ${props => (props.validation ? 'pointer' : 'not-allowed')};
  }
`;

export default Step;
