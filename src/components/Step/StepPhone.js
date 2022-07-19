// style
import styled from 'styled-components';

const StepPhone = ({
  userPhoneNumber,
  validation,
  isDuplicated,
  authMessage,
  phoneMessage,
  setPhoneMessage,
  handleInputDuplicated,
  setEnteredPhoneNumber,
  setAuthNumber,
  authNumber,
}) => {
  // 휴대폰 중복확인 후 인증 코드 날리기
  const confirmCode = () => {
    if (userPhoneNumber.length < 11) {
      setPhoneMessage(true);
      return;
    }
    setPhoneMessage(false);
    handleInputDuplicated();
  };

  return (
    <>
      <span className='desc'>
        <p>본인 확인을 위해</p>
        <p>
          <span className='strong'>휴대폰 인증</span>이 필요합니다.
        </p>
      </span>
      {phoneMessage && <Validation>*휴대폰 번호를 입력해주세요.</Validation>}
      {userPhoneNumber.trim().length !== 0 && !validation && <Validation>*휴대폰 번호가 유효하지 않아요.</Validation>}
      {validation && isDuplicated && <Validation>*이미 등록된 번호에요.</Validation>}
      {authMessage && <Validation>*휴대폰 인증을 진행해주세요.</Validation>}
      <Authorize>
        <Input
          value={userPhoneNumber}
          onChange={setEnteredPhoneNumber}
          type='text'
          placeholder="'-' 없이 입력해 주세요."
          maxLength={11}
        />
        <AuthBtn onClick={confirmCode}>코드 받기</AuthBtn>
      </Authorize>
      <AuthNumber value={authNumber} onChange={setAuthNumber} type='text' placeholder='인증 코드를 입력해주세요.' />
    </>
  );
};

const AuthNumber = styled.input`
  width: 100%;
  border-bottom: 3px solid #000000;
  padding: 5% 0;
  margin-bottom: 5vw;
  font-size: 20px;
  &::placeholder {
    font-size: 20px;
    font-weight: 800;
    color: rgba(0, 0, 0, 0.3);
  }
`;

const Input = styled.input`
  width: 65%;
  border: none;
  border-bottom: 3px solid #000000;
  padding: 5% 0;
  font-size: 20px;
  &::placeholder {
    font-size: 20px;
    font-weight: 800;
    color: rgba(0, 0, 0, 0.3);
  }
`;

const AuthBtn = styled.button`
  position: absolute;
  right: 0;
  width: 30%;
  height: 100%;
  font-size: 14px;
  font-weight: 800;
  background-color: ${(props) => props.theme.color.activeBtn};
  border-radius: 10px;
`;

const Authorize = styled.div`
  position: relative;
  margin: 15vw 0 5vw 0;
`;

const Validation = styled.span`
  display: block;
  color: red;
  font-size: 14px;
  margin-bottom: 2%;
  &:last-of-type {
    margin-bottom: 8.3%;
  }
`;

export default StepPhone;
