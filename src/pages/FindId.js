// react
import { useState } from "react";

// sweetalert
import Swal from "sweetalert2";

// style
import styled from "styled-components";

// elements
import Wrap from "../elements/Wrap";
import UserTop from "../elements/UserTop";

// axios
import instance from "../shared/axios";

// icon
import { IoIosArrowBack } from "react-icons/io";

// router
import { useNavigate } from "react-router-dom";

const FindId = () => {
  const navigate = useNavigate();
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");
  const [username, setUsername] = useState({ isShow: false, result: "" });
  const [validation, setValidation] = useState({ on: false, message: "" });

  // 핸드폰 번호 사용자 입력
  const handleSetPhoneNumber = (event) => {
    if (isNaN(Number(event.target.value))) {
      return;
    }

    setUsername({ isShow: false, result: "" });
    setEnteredPhoneNumber(event.target.value);
    setValidation({ on: false, message: "" });
  };

  // 계정 정보 받아오기
  const handleFindId = async (event) => {
    event.preventDefault();
    if (enteredPhoneNumber.trim().length === 0) {
      setValidation({ on: "true", message: "*휴대폰 번호를 입력해주세요" });
      return;
    }

    if (enteredPhoneNumber.trim().length !== 11) {
      setValidation({ on: "true", message: "*11자리의 휴대폰 번호를 입력해주세요" });
      return;
    }

    const phoneNumber = enteredPhoneNumber;

    try {
      const response = await instance.get(`/user/find/lostEmail/${phoneNumber}`);
      if (response.data.indexOf("@") === -1) {
        Swal.fire({
          title: `${response.data}`,
          icon: "warning",
          confirmButtonText: "확인",
          confirmButtonColor: "#44DCD3",
        });
        return;
      }
      setUsername({ isShow: true, result: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrap>
      <FindForm>
        <UserTop title="이메일 찾기" type="find">
          <IoIosArrowBack
            style={{ position: "absolute", cursor: "pointer", left: "2%", fontSize: "25px" }}
            onClick={() => navigate("/login")}
          />
          <span>이메일 찾기</span>
        </UserTop>
        <Container>
          <Text>
            <span>이메일 계정을 잊으셨나요?</span>
            <span>ANYZOO 가입 시 입력한</span>
            <span>휴대폰 번호를 입력해주세요.</span>
          </Text>
          <InputBox>
            <span style={{ color: validation.on && "red" }}>휴대폰 번호</span>
            {validation.on && (
              <span style={{ display: "inline-block", fontSize: "14px", color: "red", margin: "0 0 4% 0" }}>
                {validation.message}
              </span>
            )}
            <input
              value={enteredPhoneNumber}
              onChange={handleSetPhoneNumber}
              type="text"
              placeholder="'-'없이 입력해주세요."
            />
          </InputBox>
          {username.isShow && (
            <InputBox>
              <span>이메일 계정 확인</span>
              <span className="email_result">{username.result}</span>
            </InputBox>
          )}
          <button onClick={handleFindId}>계정 정보 확인</button>
        </Container>
      </FindForm>
    </Wrap>
  );
};

const FindForm = styled.form`
  input,
  button {
    width: 100%;
    padding: 15px;
    background-color: ${(props) => props.theme.color.grey};
    border-radius: 10px;
    margin-bottom: 5vw;
    font-size: 1.6rem;
  }
  button {
    font-weight: 800;
    background-color: ${(props) => props.theme.color.main};
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 20vw;
  padding: 10% 5% 0 5%;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  span:first-of-type {
    display: block;
    font-size: 1.8rem;
    font-weight: 800;
    margin-bottom: 5%;
  }
  span:nth-of-type(2),
  span:nth-of-type(3) {
    font-size: 1.2rem;
  }
  span:nth-of-type(2) {
    margin-bottom: 1%;
  }
  span:nth-of-type(3) {
    margin-bottom: 20%;
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  span:first-of-type {
    font-size: 1.4rem;
    font-weight: 800;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 3vw;
  }
  .email_result {
    font-size: 1.6rem;
    font-weight: 800;
    margin-left: 3%;
    margin-bottom: 10vw;
  }
`;

export default FindId;
