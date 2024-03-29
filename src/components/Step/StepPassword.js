// style
import styled from "styled-components";

// icon
import { AiFillEyeInvisible, AiFillEye, AiOutlineCheckCircle } from "react-icons/ai";

const StepPassword = ({
  mode,
  userPassword,
  validation,
  isShowPassword,
  setEnteredPassword,
  passwordMatch,
  passwordCheckValue,
  setEnteredPasswordCheckValue,
  setIsShowPassword,
}) => {
  return (
    <>
      {mode === "signup" && (
        <span className="desc">
          <p>
            <span className="strong">비밀번호</span>를 입력해주세요.
          </p>
        </span>
      )}
      {mode === "update" && (
        <span className="desc">
          <p>새로 변경하실</p>
          <span className="strong">비밀번호</span>를 입력해주세요.
        </span>
      )}
      {userPassword.trim().length === 0 && <Validation>*비밀번호를 입력해주세요.</Validation>}
      {userPassword.trim().length !== 0 && !validation && (
        <Validation>
          *대문자, 특수문자를 포함해주세요.
          <br />
          (8~16자 이하)
        </Validation>
      )}
      {passwordCheckValue.trim().length !== 0 && !passwordMatch && (
        <Validation>*비밀번호가 일치하지 않아요.</Validation>
      )}
      <InputBox mode={mode}>
        <input
          value={userPassword}
          onChange={setEnteredPassword}
          className="pwd"
          type={!isShowPassword ? "password" : "text"}
          placeholder="비밀번호를 입력하세요."
        />
        <Icon>
          {!isShowPassword && <AiFillEyeInvisible onClick={() => setIsShowPassword(true)} />}
          {isShowPassword && <AiFillEye onClick={() => setIsShowPassword(false)} />}
        </Icon>
      </InputBox>
      <InputBox mode={mode}>
        <input
          value={passwordCheckValue}
          onChange={setEnteredPasswordCheckValue}
          className="pwd-check"
          type="password"
          placeholder="다시 입력하세요."
        />
        <Icon>
          {passwordCheckValue.trim().length === 0 && <AiOutlineCheckCircle />}
          {passwordCheckValue.trim().length !== 0 && (
            <AiOutlineCheckCircle style={{ color: passwordMatch ? "green" : "red" }} />
          )}
        </Icon>
      </InputBox>
    </>
  );
};

const Validation = styled.span`
  display: block;
  color: red;
  font-size: 1.4rem;
  margin-bottom: 2%;
  &:last-of-type {
    margin-bottom: 8.3%;
  }
`;

const Icon = styled.div`
  position: absolute;
  font-size: 2.5rem;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const InputBox = styled.div`
  position: relative;
  width: 100%;
  border-bottom: 3px solid #000000;
  padding: 5% 0;
  &:first-of-type {
    margin-top: 10vw;
  }
  &:nth-of-type(2) {
    margin: 2vw 0 5vw 0;
  }
  input {
    font-size: 2rem;
  }
  input::placeholder {
    font-size: ${(props) => (props.mode === "update" ? "1.4rem" : "2rem")};
    font-weight: 800;
    color: rgba(0, 0, 0, 0.3);
  }
`;
export default StepPassword;
