/* eslint-disable */

// react
import { useEffect, useState } from 'react';

// icon
import { AiFillEyeInvisible, AiFillEye, AiOutlineCheckCircle } from 'react-icons/ai';

// style
import styled from 'styled-components';

// image
import profile from '../../assets/images/noProfile.png';

// axios
import instance from '../../shared/axios';

const Step = ({ step, onCountChange, onSignup }) => {
  // 패스워드 일치 여부
  const [passwordMatch, setPasswordMatch] = useState(false);

  // 유효성 검사 체크
  const [validation, setValidation] = useState({
    nickname: false,
    username: false,
    password: false,
    phoneNumber: false,
  });

  // 유효성 검사 함수
  const checkValidation = value => {
    let regExp = '';

    switch (curData) {
      case 'nickname': {
        regExp = /^[a-zA-Z가-힣0-9]{3,9}$/;
        break;
      }
      case 'username': {
        regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        break;
      }
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

  // 비밀번호 보이기, 안보이기
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [userInfo, setUserInfo] = useState({
    nickname: '',
    username: '',
    password: '',
    phoneNumber: '',
    userImage: '',
  });

  const [passwordCheckValue, setPasswordCheckValue] = useState('');

  const userInfoArr = ['agree', 'nickname', 'username', 'password', 'phoneNumber', 'userImage'];

  // 현재 입력될 input의 이름
  const curData = userInfoArr[step];

  // 이전에 입력된 input의 이름
  const prevData = step !== 0 && userInfoArr[step - 1];

  const [imageData, setImageData] = useState({ previewImage: '', imageFile: '' });

  // 회원가입 버튼을 클릭하면
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (isSubmit) {
      onSignup(userInfo);
    }
  }, [isSubmit]);

  // 업로드 이미지 -> 서버 통신
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', imageData.imageFile);
    try {
      // 서버 이미지 업로드 api 필요
      const response = await instance.post('/user/image', formData);
      console.log(response.data.id);
      // 유저 정보에 서버 이미지 url 저장
      setUserInfo({ ...userInfo, [curData]: response.data.id });
    } catch (error) {
      console.log(error);
      setIsSubmit(false);
    }
  };

  // 입력 값에 따른 중복 체크
  const [matchValue, setMatchValue] = useState({ nickname: true, username: true, phoneNumber: true });

  // 입력 값 유저 정보 state에 넣기
  const handleEnteredInfo = async event => {
    // 이미지 업로드할 때
    if (curData === 'userImage') {
      const uploadFile = event.target.files[0];

      if (uploadFile) {
        const previewImagePath = URL.createObjectURL(uploadFile);
        setImageData({ previewImage: previewImagePath, imageFile: uploadFile });
      } else {
        setImageData({ previewImage: '', imageFile: '' });
        setUserInfo({ ...userInfo, userImage: '' });
        return;
      }
      return;
    }

    // 숫자 이외의 값 입력 방지
    if (curData === 'phoneNumber') {
      if (isNaN(Number(event.target.value))) {
        return;
      } else {
      }
    }

    // img 외의 값 유효성 검사
    checkValidation(event.target.value);
    setUserInfo({ ...userInfo, [curData]: event.target.value });
  };
  console.log(userInfo);
  // 비밀번호 일치 여부
  const handleEnteredPwdCheck = event => {
    setPasswordCheckValue(event.target.value);
  };

  useEffect(() => {
    if (validation.password && userInfo.password === passwordCheckValue) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  }, [validation.password, userInfo.password, passwordCheckValue]);

  // 이전 단계, 다음 단계 이동
  const handleStepMove = moveStep => {
    if (step === 1 && moveStep === -1) {
      setAgreeArr({ all: false, first: false, second: false });
      setIsAllAgree(false);
    }
    if (step !== 0 && moveStep === -1) {
      setUserInfo({ ...userInfo, [prevData]: '', [curData]: '' });
      setValidation({ ...validation, [prevData]: false, [curData]: false });

      if (step === 3 || (step === 4 && moveStep === -1)) {
        setPasswordCheckValue('');
        setIsShowPassword(false);
      }
    }
    onCountChange(moveStep);
  };

  // 가입하기
  const singup = async () => {
    imageData.previewImage && (await uploadImage());
    setIsSubmit(true);
  };

  // step별 화면 보여주기
  let content = '';

  // 약관 동의 체크
  const [agreeArr, setAgreeArr] = useState({ all: false, first: false, second: false });
  const [isAllAgree, setIsAllAgree] = useState(false);

  const handleAgreeCheck = index => {
    if (index === 'all') {
      const result = agreeArr['all'] ? true : false;
      setIsAllAgree(!result);
      setAgreeArr({
        all: !result,
        first: !result,
        second: !result,
      });
      return;
    }

    for (const key in agreeArr) {
      if (key !== 'all' && index !== key && !agreeArr[index] && agreeArr[key]) {
        setAgreeArr({ ...agreeArr, all: true, [index]: !agreeArr[index] });
        setIsAllAgree(true);
        return;
      } else {
        setIsAllAgree(false);
      }
    }

    !agreeArr[index] && setAgreeArr({ ...agreeArr, [index]: !agreeArr[index] });
    agreeArr[index] && setAgreeArr({ ...agreeArr, all: false, [index]: !agreeArr[index] });
  };

  if (step === 0) {
    content = (
      <>
        <span style={{ fontSize: '30px', fontWeight: 'bold' }}>약관동의</span>
        <Guide>
          <GuideBox>
            <div>회원가입 전, 애니쥬 약관을 확인해주세요.</div>
          </GuideBox>
          <GuideList onClick={() => handleAgreeCheck('all')}>
            <span>약관 전체동의</span>
            <div className={agreeArr['all'] ? 'box checked' : 'box'}></div>
          </GuideList>
          <GuideList onClick={() => handleAgreeCheck('first')}>
            <span>이용약관 동의(필수)</span>
            <div className={agreeArr['first'] ? 'box checked' : 'box'}></div>
          </GuideList>
          <GuideList onClick={() => handleAgreeCheck('second')}>
            <span>개인정보 수집 및 이용동의(필수)</span>
            <div className={agreeArr['second'] ? 'box checked' : 'box'}></div>
          </GuideList>
        </Guide>
      </>
    );
  }

  if (step === 1) {
    content = (
      <>
        <span className='desc'>
          <p>당신의</p>
          <p>
            <span className='strong'>별명</span>은?
          </p>
        </span>
        {userInfo[curData].trim().length !== 0 && !validation[curData] && (
          <Validation>
            * 영문자, 특수문자, 숫자, 3~10글자
            <br />
          </Validation>
        )}
        <input value={userInfo.nickname} onChange={handleEnteredInfo} type='text' placeholder='별명을 입력해주세요.' />
      </>
    );
  }

  if (step === 2) {
    content = (
      <>
        <span className='desc'>
          <p>
            <span className='strong'>이메일</span>을
          </p>
          <p>입력해주세요.</p>
        </span>
        {userInfo[curData].trim().length !== 0 && !validation[curData] && (
          <Validation>
            * 이메일 형식이 유효하지 않아요.
            <br />
          </Validation>
        )}
        {/* <span>* 이미 등록된 이메일입니다.</span> */}
        <input
          value={userInfo.username}
          onChange={handleEnteredInfo}
          type='text'
          placeholder='이메일을 입력해주세요.'
        />
      </>
    );
  }

  if (step === 3) {
    content = (
      <>
        <span className='desc'>
          <p>
            <span className='strong'>비밀번호</span>를
          </p>
          <p>입력해주세요.</p>
        </span>
        {userInfo[curData].trim().length !== 0 && !validation[curData] && (
          <Validation>
            * 대문자, 특수문자를 포함해주세요. (8~16글자)
            <br />
          </Validation>
        )}
        {passwordCheckValue.trim().length !== 0 && !passwordMatch && (
          <Validation>* 비밀번호가 일치하지 않아요.</Validation>
        )}
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
            {passwordCheckValue.trim().length === 0 && <AiOutlineCheckCircle />}
            {passwordCheckValue.trim().length !== 0 && (
              <AiOutlineCheckCircle style={{ color: passwordMatch ? 'green' : 'red' }} />
            )}
          </Icon>
        </InputBox>
      </>
    );
  }

  if (step === 4) {
    content = (
      <>
        <span className='desc'>
          <p>본인 확인을 위해</p>
          <p>
            <span className='strong'>휴대폰 인증</span>이 필요합니다.
          </p>
        </span>

        <Validation>
          {userInfo[curData].trim().length !== 0 && !validation[curData] && (
            <Validation>* 휴대폰 번호가 유효하지 않아요.</Validation>
          )}
        </Validation>
        <input
          value={userInfo.phoneNumber}
          onChange={handleEnteredInfo}
          type='text'
          placeholder="'-'없이 입력해 주세요."
          maxLength={11}
        />
        <Authorize>
          <Input placeholder='인증 번호를 입력해 주세요.'></Input>
          <AuthBtn>인증</AuthBtn>
        </Authorize>
      </>
    );
  }

  // 기본 이미지 클릭하면 파일 선택하기 창 띄우기
  const handleSelectImg = () => {
    const img = document.querySelector('.selectImg');
    img.addEventListener('click', img.click());
  };

  if (step === 5) {
    content = (
      <>
        <span className='desc'>
          <p>마지막으로</p>
          <p>
            <span className='strong'>프로필이미지</span>를
          </p>
          <p>설정해주세요.</p>
        </span>
        <Profile>
          <img
            className='defaultImg'
            src={imageData.previewImage || profile}
            alt='profile'
            accept='image/*'
            onClick={handleSelectImg}
          />
          <input className='selectImg' onChange={handleEnteredInfo} type='file' accept='image/*' />
        </Profile>
      </>
    );
  }

  // step 4 마지막 가입 단계일 때
  let buttons = '';

  if (step === 0) {
    buttons = (
      <ButtonBox step={step} width='100%' validation={isAllAgree}>
        <NextBtn onClick={() => isAllAgree && handleStepMove(1)}>다음</NextBtn>
      </ButtonBox>
    );
  }

  if (step > 0 && step < 5) {
    buttons = (
      <ButtonBox step={step} validation={step === 3 ? passwordMatch : validation[curData]}>
        <PrevBtn onClick={() => handleStepMove(-1)}>이전 단계</PrevBtn>
        <NextBtn onClick={() => validation[curData] && handleStepMove(1)}>다음 단계</NextBtn>
      </ButtonBox>
    );
  }

  if (step === 5)
    buttons = (
      <ButtonBox step={step} validation={validation[curData]}>
        <PrevBtn onClick={() => handleStepMove(-1)}>이전 단계</PrevBtn>
        <PrevBtn step={step} onClick={() => singup()}>
          가입하기
        </PrevBtn>
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
    margin-bottom: 20px;
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
  input[type='file'] {
    display: none;
  }
`;

const Profile = styled.div`
  text-align: center;
  margin: 10% 0 15% 0;
  .defaultImg {
    cursor: pointer;
    border-radius: 50%;
    width: 100px;
    height: 100px;
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

const Guide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 27px 0;
`;

const GuideBox = styled.div`
  width: 95%;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 27px;
  box-shadow: 5px 5px 3px 3px #ccc;
`;

const GuideList = styled.div`
  width: 95%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;

  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border-radius: 50%;
    border: 2px solid #ababab;
    overflow: hidden;
  }
  .box.checked {
    &::after {
      content: '✔';
      background-color: ${props => props.theme.color.activeBtn};
      color: #ffffff;
      font-size: 20px;
      width: 100%;
      height: 100%;
    }
  }
`;

const Input = styled.input``;
const AuthBtn = styled.button``;
const Authorize = styled.div`
  position: relative;
`;

const Validation = styled.span`
  color: red;
  font-size: 14px;
  margin-bottom: 10%;
`;

const PrevBtn = styled.button``;
const NextBtn = styled.button``;
const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    font-size: 16px;
    width: 45%;
    height: 50px;
    background-color: #ccc;
    border-radius: 10px;
  }
  ${PrevBtn} {
    transition: 0.5s;
  }
  ${PrevBtn}:hover {
    background-color: ${props => props.theme.color.activeBtn};
  }
  ${NextBtn} {
    width: ${props => props.width};
    background-color: ${props => (props.validation ? props.theme.color.activeBtn : props.theme.color.inactiveBtn)};

    cursor: ${props => props.validation && 'pointer'};
    transition: 0.5s;
  }
`;

export default Step;
