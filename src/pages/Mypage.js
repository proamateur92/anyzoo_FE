// react
import { useState, useEffect, useCallback } from "react";

// components
import Friends from "../components/Mypage/Friends";
import TogetherCard from "../components/TogetherCard";
import CommunityCard from "../components/CommunityCard";

// element
import Wrap from "../elements/Wrap";
import UserTop from "../elements/UserTop";

// style
import styled from "styled-components";

// icon
import { AiOutlineRight } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdCancel } from "react-icons/md";

// redux
import { useSelector } from "react-redux";

// sweetalert
import Swal from "sweetalert2";

// router
import { useNavigate, useParams } from "react-router-dom";

// axios
import instance from "../shared/axios";

// userSlice
import { updateUserImageDB, updateUserNicknameDB } from "../redux/modules/userSlice";

// redux
import { useDispatch } from "react-redux";

const Mypage = () => {
  const dispatch = useDispatch();
  const { nickname } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);

  // 나의 정보
  const myInfo = useSelector((state) => state.user.info);
  // 특정 마이페이지의 회원 정보
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  const [contents, setContents] = useState({ post: [], community: [], together: [], reels: [] });
  const contentType = ["post", "community", "together", "reels"];
  const [tap, setTap] = useState(contentType[0]);

  // 회원정보 가져오기
  useEffect(() => {
    setIsLoading(false);
    getUserInfo();
    setTap(contentType[0]);
    getContent(contentType[0]);
  }, [nickname]);

  const getUserInfo = async () => {
    try {
      const response = await instance.get(`/api/mypage/userInfo/${nickname}`);
      if (!response.data) {
        Swal.fire({
          title: `존재하지 않는 회원이에요. 메인페이지로 이동합니다.`,
          icon: "warning",
          confirmButtonText: "확인",
          confirmButtonColor: "#44DCD3",
        });
        navigate("/");
        return;
      }
      setUserInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getContent = useCallback(
    async (newTap) => {
      try {
        const response = await instance.get(`/api/mypage/${newTap}/${nickname}?page=0`);
        const contentList = response.data.content;
        if (contentList.length !== 0) {
          setContents({ ...contents, [newTap]: contentList });
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(true);
    },
    [nickname, contents]
  );

  useEffect(() => {
    setIsLoading(false);
    const newTap = tap;
    getContent(newTap);
  }, [tap]);

  // 페이지 이동
  const handleMoveStep = (stepNum) => {
    setStep(stepNum);

    setNewUserInfo({
      nickname: myInfo.nickname,
      password: "",
      phoneNumber: myInfo.phoneNumber,
    });

    setCheckPasswordValue("");
    setUserAuthNumber("");

    if (stepNum !== 2) {
      setValidation({
        nickname: true,
        password: true,
        phoneNumber: true,
      });
    }

    setAllValidation(true);
    setIsActiveBtn(false);
    setImageData({ previewImage: "", imageFile: "" });
    setIsSubmit(false);
  };

  const [newUserInfo, setNewUserInfo] = useState({
    nickname: myInfo.nickname,
    password: "",
    phoneNumber: myInfo.phoneNumber,
  });

  const [checkPasswordValue, setCheckPasswordValue] = useState("");

  // 유효성 검사 체크
  const [validation, setValidation] = useState({
    nickname: true,
    password: true,
    phoneNumber: true,
  });

  const [imageData, setImageData] = useState({ previewImage: "", imageFile: "" });

  // 인증번호 받기
  // 인증번호 중복 여부

  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const [allValidation, setAllValidation] = useState(true);

  useEffect(() => {
    const pass = Object.values(validation).indexOf(false) === -1 ? true : false;
    setAllValidation(pass);
  }, [validation]);

  const [changeInfoType, setChangeInfoType] = useState({
    username: false,
    nickname: false,
    phoneNumber: false,
    userImage: false,
  });

  useEffect(() => {
    if (!allValidation) {
      setIsActiveBtn(false);
      return;
    }

    const checkNickname = newUserInfo.nickname !== myInfo.nickname;
    const checkPassword = !!newUserInfo.password;
    const checkPhoneNumber = newUserInfo.phoneNumber !== myInfo.phoneNumber;

    setChangeInfoType({ nickname: checkNickname, password: checkPassword, phoneNumber: checkPhoneNumber });

    if (checkNickname || (checkPassword && isPasswordMatch && validation.password)) {
      setIsActiveBtn(true);
    } else {
      setIsActiveBtn(false);
    }
  }, [newUserInfo, isPasswordMatch, allValidation]);

  // 유효성 검사 함수
  const checkValidation = (type, value) => {
    let regExp = "";

    switch (type) {
      case "nickname": {
        regExp = /^[a-zA-Z가-힣0-9]{3,9}$/;
        break;
      }
      case "password": {
        regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
        break;
      }
      case "phoneNumber": {
        regExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{5})$/;
        break;
      }
      default: {
        return;
      }
    }

    const result = regExp.test(value);
    setValidation({ ...validation, [type]: result });
  };

  const handleEnteredCheckPassword = (event) => {
    setCheckPasswordValue(event.target.value);
    setIsPasswordMatch(newUserInfo.password === event.target.value);
  };

  const handleSelectImg = () => {
    const img = document.querySelector(".selectImg");
    img.addEventListener("click", img.click());
  };

  useEffect(() => {
    imageData.imageFile && uploadImage();
  }, [imageData]);

  const handleEnteredInfo = async (event, type) => {
    setIsClickUpdateBtn(false);
    if (type === "image") {
      const uploadFile = event.target.files[0];
      if (uploadFile) {
        const previewImagePath = URL.createObjectURL(uploadFile);
        setImageData({ previewImage: previewImagePath, imageFile: uploadFile });
      } else {
        setImageData({ previewImage: "", imageFile: "" });
        return;
      }
      return;
    }

    if (type === "authNumber") {
      if (isNaN(Number(event.target.value))) {
        return;
      }
      setUserAuthNumber(event.target.value);
    }

    if (type === "phoneNumber") {
      if (isNaN(Number(event.target.value))) {
        return;
      }
      setIsShowAvailableTime(false);
      setIsClickAuthBtn(false);
    }

    checkValidation(type, event.target.value);
    setNewUserInfo({ ...newUserInfo, [type]: event.target.value });
  };

  const [isDuplicated, setIsDuplicated] = useState({ nickname: true, phoneNumber: true });
  const [isClickUpdateBtn, setIsClickUpdateBtn] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (isSubmit) {
      console.log("수정요청 보내기 2 -> 3단계");
      console.log(`isSubmit: ${isSubmit}`);
      onUpdate();
    }
  }, [isSubmit]);

  const onUpdate = async () => {
    const nickname = changeInfoType.nickname ? newUserInfo.nickname : null;
    const password = changeInfoType.password ? newUserInfo.password : null;

    console.log(`nickname: ${nickname}`);
    console.log(`password: ${password}`);

    try {
      await instance.patch("/api/user/edit/userInfo", {
        nickname,
        password,
      });
      setIsSubmit(false);
      Swal.fire({
        title: "회원정보를 수정했어요!",
        icon: "success",
        confirmButtonText: "확인",
        confirmButtonColor: "#44DCD3",
      });
      navigate(`/mypage/${nickname}`);
      nickname && dispatch(updateUserNicknameDB({ nickname }));
    } catch (error) {
      console.log(error);
    }

    setCheckPasswordValue("");
  };

  const changeImage = async (url, id) => {
    console.log(typeof id);
    console.log(id);
    try {
      await instance.patch("/api/user/edit/userImage", { userImage: id });
      dispatch(updateUserImageDB({ userImage: url }));
    } catch (error) {
      console.log(error);
    }
  };
  // 업로드 이미지 -> 서버 통신
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", imageData.imageFile);
    try {
      // 서버 이미지 업로드 api 필요
      const response = await instance.post("/user/image", formData);
      // 유저 정보에 서버 이미지 url 저장
      console.log("이미지 서버 등록");
      console.log(response.data);
      // 바로 이미지 변경하겠냐는 팝업 띄우기
      Swal.fire({
        title: "이미지를 변경할까요?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "네 변경할게요.",
        cancelButtonText: "아니요 변경안해요",
        confirmButtonColor: "#44DCD3",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          changeImage(response.data.url, response.data.id);
        } else {
          setImageData({ previewImage: "", imageFile: "" });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateNewInfo = async (event) => {
    event.preventDefault();
    let check = false;

    console.log("1단계");
    if (newUserInfo.nickname.trim().length === 0) {
      return;
    }

    setIsClickUpdateBtn(true);
    if (changeInfoType.nickname) {
      console.log("닉네임 검사");
      try {
        const response = await instance.get(`/user/checkNickname/${newUserInfo.nickname}`);
        check = response.data;
        setIsDuplicated({ ...isDuplicated, nickname: response.data });
      } catch (error) {
        console.log(error);
      }
    }

    if (!check) {
      setIsSubmit(true);
    }
  };

  // 인증 코드 대기
  const [waitSendCodeTime, setWaitSendCodeTime] = useState(false);

  // 인증 코드 재요청까지 남은 시간
  const [leftTime, setLeftTime] = useState(5);

  // 인증번호 클릭 여부
  const [isClickAuthBtn, setIsClickAuthBtn] = useState(false);

  // 인증번호 남은 시간 문구 발생 여부
  const [isShowAvailableTime, setIsShowAvailableTime] = useState(false);

  // 인증 문구 발생 여부
  const [authMessage, setAuthMessage] = useState(false);

  // 인증 코드 발생 여부
  const [isSendCode, setIsSendCode] = useState(false);

  // 남은 시간 체크
  const [availableTime, setAvailableTime] = useState(180);

  // 인증번호 통과 여부
  const [passedAuth, setPassedAuth] = useState(false);

  // 유저가 입력한 인증 번호
  const [userAuthNumber, setUserAuthNumber] = useState("");

  // 인증 번호 요청
  const callSendCodeHandler = async () => {
    console.log("인증번호 발송");

    try {
      await instance.get(`/user/send/phoneVerification/${newUserInfo.phoneNumber}`);
      Swal.fire({
        title: "인증번호를 발송했어요!",
        icon: "success",
        confirmButtonText: "확인",
        confirmButtonColor: "#44DCD3",
      });

      setAvailableTime(180);
      setIsSendCode(true);
      setAuthMessage(false);
      setWaitSendCodeTime(true);
      setIsShowAvailableTime(true);

      setTimeout(() => {
        setWaitSendCodeTime(false);
      }, 5000);

      const stopLeftTime = setInterval(() => {
        setLeftTime((prev) => prev - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(stopLeftTime);
        setLeftTime(5);
      }, 5000);

      const decreaseAvailableTime = setInterval(() => {
        setAvailableTime((prev) => prev - 1);
      }, 1000);

      // 3분 동안만 인증 가능
      setTimeout(() => {
        clearInterval(decreaseAvailableTime);
        setPassedAuth(false);
        alert("인증시간을 초과했습니다.");
      }, 180001);

      isSendCode && clearInterval(decreaseAvailableTime);

      setIsSendCode(true);
    } catch (error) {
      console.log(error);
    }
  };

  // 인증 번호 요청 전 중복 확인
  const sendAuthNumber = async () => {
    setIsClickAuthBtn(true);

    if (waitSendCodeTime) {
      Swal.fire({
        title: `${leftTime}초 후에 요청이 가능해요.`,
        icon: "warning",
        confirmButtonText: "확인",
        confirmButtonColor: "#44DCD3",
      });
      return;
    }

    if (myInfo.phoneNumber === newUserInfo.phoneNumber) {
      alert("이전과 동일한 번호에요.");
      return;
    }

    let check = false;

    if (changeInfoType.phoneNumber) {
      console.log("핸드폰 검사");
      try {
        const response = await instance.get(`/user/checkPhoneNumber/${newUserInfo.phoneNumber}`);
        check = response.data;
        setIsDuplicated({ ...isDuplicated, phoneNumber: response.data });

        if (!check) {
          callSendCodeHandler();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  let content = "";

  if (step === 0) {
    content = (
      <>
        <Profile>
          <img src={myInfo.nickname !== userInfo.nickname ? userInfo.img : myInfo.img} alt="프로필 이미지" />
          <Nickname onClick={() => handleMoveStep(2)}>
            <span>{nickname}</span>
            {myInfo.nickname === nickname && (
              <Right>
                <AiOutlineRight style={{ fontSize: "2rem", fontWeight: "800" }} />
              </Right>
            )}
          </Nickname>
        </Profile>
        <Follow onClick={() => handleMoveStep(1)}>
          <div>
            <span>팔로잉</span>
            <span>{userInfo.following}</span>
          </div>
          <div>|</div>
          <div>
            <span>팔로우</span>
            <span>{userInfo.follower}</span>
          </div>
        </Follow>
        <Tap mode={tap}>
          <div onClick={() => setTap(contentType[0])}>
            <span>자랑하기</span>
          </div>
          <div onClick={() => setTap(contentType[1])}>
            <span>커뮤니티</span>
          </div>
          <div onClick={() => setTap(contentType[2])}>
            <span>함께하기</span>
          </div>
          <div onClick={() => setTap(contentType[3])}>
            <span>릴스</span>
          </div>
        </Tap>
      </>
    );
  } else if (step === 1) {
    content = <Friends nickname={nickname} handleMoveStep={handleMoveStep} />;
  } else if (step === 2) {
    content = (
      <>
        <Profile mode="update">
          <img
            className="defaultImg"
            src={imageData.previewImage || myInfo.img}
            alt="profile"
            accept="image/*"
            onClick={handleSelectImg}
          />
          <Icon type="plus" onClick={handleSelectImg}>
            <AiFillPlusCircle />
          </Icon>
          <input
            className="selectImg"
            onChange={(event) => handleEnteredInfo(event, "image")}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
          />
        </Profile>
        <UpdateForm
          active={newUserInfo.nickname.trim().length !== 0 && isActiveBtn}
          onSubmit={(event) =>
            // newUserInfo.password.trim().length !== 0 &&
            isActiveBtn && updateNewInfo(event)
          }
        >
          <span>이메일</span>
          <div className="box">{myInfo.username}</div>
          <span>휴대폰 번호</span>
          <div className="box">{myInfo.phoneNumber}</div>
          <span>닉네임</span>
          <EditArea active={!isDuplicated.nickname && newUserInfo.nickname.trim().length !== 0 && isActiveBtn}>
            <input
              className="input"
              value={newUserInfo.nickname}
              onChange={(event) => handleEnteredInfo(event, "nickname")}
              type="text"
              placeholder="닉네임을 입력해주세요."
            />
            <Cancel onClick={() => setNewUserInfo({ ...newUserInfo, nickname: "" })}>
              <MdCancel />
            </Cancel>
          </EditArea>
          {newUserInfo.nickname.length !== 0 && !validation.nickname && <p>*영문자, 한글, 숫자, 3~10글자</p>}
          {isActiveBtn && isClickUpdateBtn && changeInfoType.nickname && isDuplicated.nickname && (
            <p>*중복된 닉네임이에요.</p>
          )}
          {newUserInfo.nickname.trim().length === 0 && <p>*닉네임을 입력해주세요.</p>}

          {/* <span>비밀번호</span>
          <input
            type="password"
            onChange={(event) => handleEnteredInfo(event, "password")}
            placeholder="비밀번호를 입력해주세요."
          />
          {newUserInfo.password.trim().length !== 0 && !validation.password && (
            <p>*대문자, 특수문자를 포함해주세요. (8~16자 이하).</p>
          )}
          <span>비밀번호 확인</span>
          <input
            value={checkPasswordValue}
            onChange={handleEnteredCheckPassword}
            type="password"
            placeholder="비밀번호를 다시 입력해주세요."
          />
          {newUserInfo.password.trim().length !== 0 && checkPasswordValue.trim().length === 0 && (
            <p>*비밀번호를 다시 입력해주세요.</p>
          )}
          {!isPasswordMatch && checkPasswordValue.trim().length !== 0 && <p>*비밀번호가 일치하지 않아요.</p>} */}
          {/* <PhoneDiv active={validation.phoneNumber}>
            <input
              className="input"
              value={newUserInfo.phoneNumber}
              onChange={(event) => handleEnteredInfo(event, "phoneNumber")}
              type="text"
              placeholder="휴대폰 번호를 입력해주세요."
              maxLength={11}
            />
            {isShowAvailableTime && (
              <span>
                남은시간 0{Math.floor(availableTime / 60)}:{availableTime % 60 < 10 && 0}
                {availableTime % 60}
              </span>
            )}
            <button onClick={() => validation.phoneNumber && sendAuthNumber()}>인증번호 받기</button>
          </PhoneDiv>
          {newUserInfo.phoneNumber.length !== 0 && !validation.phoneNumber && (
            <p>*휴대폰 번호 형식이 유효하지 않아요.</p>
          )}
          <span>인증번호</span>
          {isSendCode && (
            <input
              className="input"
              value={userAuthNumber}
              onChange={(event) => handleEnteredInfo(event, "authNumber")}
              type="text"
              maxLength={4}
              placeholder="인증번호를 입력해주세요."
            />
          )}
          {isSendCode && <button>인증</button>} */}
          <button
            className="submitNewInfo"
            onClick={(event) =>
              // newUserInfo.password.trim().length !== 0 &&
              newUserInfo.nickname.trim().length !== 0 && isActiveBtn && updateNewInfo(event)
            }
          >
            저장
          </button>
        </UpdateForm>
      </>
    );
  }

  return (
    isLoading && (
      <Wrap>
        <UserTop
          title={myInfo.nickname !== nickname ? nickname : "마이페이지"}
          type="mypage"
          step={step}
          moveStep={handleMoveStep}
          showLogout={nickname === myInfo.nickname}
        />
        {content}
        <ContentContainer>
          {step === 0 &&
            tap === "post" &&
            (contents.post?.length ? (
              contents.post.map((p) => (
                <Content
                  key={p.boardMainId}
                  img={p.img[0].url}
                  onClick={() => navigate(`/post/detail/${p.boardMainId}`)}
                ></Content>
              ))
            ) : (
              <span className="no">작성한 글이 없어요.</span>
            ))}
          <InnerWrap mode="community" active={tap}>
            {step === 0 &&
              tap === "community" &&
              (contents.community?.length ? (
                contents.community.map((item) => <CommunityCard key={item.boardMainId} data={item} />)
              ) : (
                <span className="no_other">작성한 커뮤니티 글이 없어요.</span>
              ))}
          </InnerWrap>
          <InnerWrap mode="together" active={tap}>
            {step === 0 &&
              tap === "together" &&
              (contents.together?.length ? (
                contents.together.map((item) => <TogetherCard key={item.boardMainId} data={item} />)
              ) : (
                <span className="no_other">작성한 함께하기 글이 없어요.</span>
              ))}
          </InnerWrap>
          {step === 0 &&
            tap === "reels" &&
            (contents.reels?.length ? (
              contents.reels.map((p) => (
                <Content
                  key={p.boardMainId}
                  img={p.titleImg}
                  onClick={() => navigate(`/reels/${p.boardMainId}`)}
                ></Content>
              ))
            ) : (
              <span className="no">작성한 릴스가 없어요.</span>
            ))}
        </ContentContainer>
      </Wrap>
    )
  );
};

const UpdateForm = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10% 5% 0 5%;
  button {
    background-color: ${(props) => props.theme.color.main};
  }
  .box,
  button {
    width: 100%;
    padding: 15px;
    background-color: ${(props) => props.theme.color.grey};
    border-radius: 10px;
    margin-bottom: 5vw;
    font-size: 1.6rem;
  }
  span {
    font-size: 1.2rem;
    margin-bottom: 2%;
  }
  p {
    display: inline-block;
    margin: 1% 3% 5% 3%;
    color: red;
  }
  .box {
    color: #a3a3a3;
  }
  .submitNewInfo {
    margin-top: 5%;
    background-color: ${(props) => (props.active ? props.theme.color.main : props.theme.color.grey)};
  }
`;

const PhoneDiv = styled.div`
  button {
    background-color: ${(props) => (props.active ? props.theme.color.main : props.theme.color.grey)};
  }
`;

const InnerWrap = styled.div`
  width: 90%;
  margin: ${(props) => props.mode === "community" && "6.8% auto 0 auto"};
  margin: ${(props) => props.mode === "together" && "auto"};
  margin-top: ${(props) => props.active === "reels" && "0"};
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  .no {
    display: block;
    font-size: 1.4em;
    margin: 15% auto 0 auto;
  }
  .no_other {
    display: block;
    font-size: 1.3em;
    margin: 8.8% auto 0 auto;
  }
`;

const Content = styled.div`
  width: 25%;

  padding-top: 25%;
  box-sizing: border-box;
  border: solid 1px rgba(0, 0, 0, 0.1);
  background-color: red;
  background: ${(props) => (props.img ? `url(${props.img})` : "#ddd")};
  background-size: cover;
  background-position: center;
  cursor: pointer;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1%;
`;

const Nickname = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  width: 100%;
  margin: 12% 0;
  cursor: pointer;
`;

const Profile = styled.div`
  display: flex;
  position: relative;
  width: 40%;
  margin: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  margin-top: 3%;
  cursor: ${(props) => props.mode === "update" && "pointer"};
  img {
    width: 4.5em;
    height: 4.5em;
    border-radius: 50%;
  }
  span {
    display: block;
    font-size: 2rem;
  }
`;

const EditArea = styled.div`
  position: relative;
  width: 100%;
  padding: 15px;
  background-color: ${(porps) => porps.theme.color.grey};
  border-radius: 12px;
  input {
    font-size: 1.6rem;
    background-color: ${(porps) => porps.theme.color.grey};
  }
  input::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }
`;

const Cancel = styled.div`
  position: absolute;
  font-size: 2.5rem;
  right: 10px;
  top: 55%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const Icon = styled.div`
  position: absolute;
  right: ${(props) => (props.type === "plus" ? "22%" : "0%")};
  bottom: ${(props) => (props.type === "plus" ? "-13%" : "-1%")};
  color: ${(props) => (props.type === "plus" ? props.theme.color.main : "rgba(0, 0, 0, 0.3)")};
  font-size: ${(props) => (props.type === "plus" ? "2.5rem" : "1.6rem")};
  font-weight: 800;
`;

const Follow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 800;
  width: 40%;
  margin: 5% auto;
  div {
    display: flex;
    flex-direction: column;
  }
  div:first-of-type {
    cursor: pointer;
  }
  div:nth-of-type(2) {
    margin: 0 4%;
    font-size: 1rem;
    color: #d9d9d9;
  }
  div:nth-of-type(3) {
    cursor: pointer;
  }
  span:first-of-type {
    margin: 2% 0;
  }
`;

const Tap = styled.div`
  display: flex;
  font-size: 1.3rem;
  font-weight: 800;
  border-top: 0.2rem solid #d9d9d9;
  div {
    padding: 5%;
    width: 25%;
    cursor: pointer;
    text-align: center;
  }
  div:first-of-type {
    border-bottom: ${(props) =>
      props.mode === "post" ? `0.2rem solid ${props.theme.color.main}` : "0.2rem solid #ffffff"};
  }
  div:nth-of-type(2) {
    border-bottom: ${(props) =>
      props.mode === "community" ? `0.2rem solid ${props.theme.color.main}` : "0.2rem solid #ffffff"};
  }
  div:nth-of-type(3) {
    border-bottom: ${(props) =>
      props.mode === "together" ? `0.2rem solid ${props.theme.color.main}` : "0.2rem solid #ffffff"};
  }
  div:nth-of-type(4) {
    border-bottom: ${(props) =>
      props.mode === "reels" ? `0.2rem solid ${props.theme.color.main}` : "0.2rem solid #ffffff"};
  }
`;

export default Mypage;
