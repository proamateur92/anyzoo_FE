import { useState } from 'react';
import { AiFillEyeInvisible, AiFillEye, AiOutlineCheckCircle } from 'react-icons/ai';
import styled from 'styled-components';

const Step = ({ step, onCountChange }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  let content = '';

  if (step === 0) {
    content = (
      <>
        <span className='desc'>
          당신의
          <br />
          <span className='strong'>별명</span>은?
        </span>
        <input type='text' placeholder='별명을 입력해주세요.' />
      </>
    );
  }

  if (step === 1) {
    content = (
      <>
        <span className='desc'>
          <span className='strong'>이메일</span>을
          <br />
          입력해주세요.
        </span>
        <input type='text' placeholder='이메일을 입력해주세요.' />
      </>
    );
  }

  if (step === 2) {
    content = (
      <>
        <span className='desc'>
          <span className='strong'>비밀번호</span>를
          <br />
          입력해주세요.
        </span>
        <span className='notice'>* 대문자, 특수문자를 포함해주세요.</span>
        <InputBox>
          <input className='pwd' type={!isShowPassword ? 'password' : 'text'} placeholder='비밀번호를 입력해주세요.' />
          <Icon>
            {!isShowPassword && <AiFillEyeInvisible onClick={() => setIsShowPassword(true)} />}
            {isShowPassword && <AiFillEye onClick={() => setIsShowPassword(false)} />}
          </Icon>
        </InputBox>
        <InputBox>
          <input className='pwd-check' type='password' placeholder='비밀번호를 다시 입력해주세요.' />
          <Icon>
            <AiOutlineCheckCircle />
          </Icon>
        </InputBox>
      </>
    );
  }

  const elButton = step < 4 ? <button onClick={() => onCountChange()}>다음 단계</button> : <button>가입하기</button>;
  return (
    <Container>
      {content}
      {elButton}
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
  button {
    align-self: flex-end;
    font-size: 16px;
    width: 130px;
    height: 50px;
    border-radius: 10px;
  }
`;

const InputBox = styled.div`
  position: relative;
  input {
    box-sizing: border-box;
    height: 55px;
    padding: 0 10px;
    font-size: 20px;
    border-bottom: 3px solid #ccc;
  }
  input:last-of-type {
    margin-bottom: 0;
  }
  input::placeholder {
    font-size: 16px;
    color: #ccc;
  }
  &:last-of-type {
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

export default Step;
