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

// redux
import { useSelector } from "react-redux";

// sweetalert
import Swal from "sweetalert2";

// router
import { useNavigate, useParams } from "react-router-dom";

// axios
import instance from "../shared/axios";

const Mypage = () => {
  const { nickname } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);
  const myInfo = useSelector((state) => state.user.info);
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
      username: myInfo.username,
      phoneNumber: myInfo.phoneNumber,
      userImage: "",
    });

    setValidation({
      nickname: true,
      username: true,
      password: true,
      phoneNumber: true,
    });

    setAllValidation(true);
    setIsActiveBtn(false);
    setImageData({ previewImage: "", imageFile: "" });
  };

  const [newUserInfo, setNewUserInfo] = useState({
    nickname: myInfo.nickname,
    username: myInfo.username,
    phoneNumber: myInfo.phoneNumber,
    userImage: "",
  });

  // 유효성 검사 체크
  const [validation, setValidation] = useState({
    nickname: true,
    username: true,
    password: true,
    phoneNumber: true,
  });

  const [imageData, setImageData] = useState({ previewImage: "", imageFile: "" });

  // 인증번호 받기
  // 인증번호 중복 여부

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
    image: false,
  });

  useEffect(() => {
    if (!allValidation) {
      setIsActiveBtn(false);
      return;
    }

    const image = !!imageData.imageFile;
    const checkUsername = newUserInfo.username !== myInfo.username;
    const checkNickname = newUserInfo.nickname !== myInfo.nickname;
    const checkPhoneNumber = newUserInfo.phoneNumber !== myInfo.phoneNumber;

    setChangeInfoType({ username: checkUsername, nickname: checkNickname, phoneNumber: checkPhoneNumber, image });

    if (image || checkUsername || checkNickname || checkPhoneNumber) {
      setIsActiveBtn(true);
    } else {
      setIsActiveBtn(false);
    }
  }, [imageData.imageFile, newUserInfo, allValidation]);

  // 유효성 검사 함수
  const checkValidation = (type, value) => {
    let regExp = "";

    switch (type) {
      case "nickname": {
        regExp = /^[a-zA-Z가-힣0-9]{3,9}$/;
        break;
      }
      case "username": {
        regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
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

  const handleSelectImg = () => {
    const img = document.querySelector(".selectImg");
    img.addEventListener("click", img.click());
  };

  const handleEnteredInfo = async (event, type) => {
    if (type === "image") {
      const uploadFile = event.target.files[0];
      if (uploadFile) {
        const previewImagePath = URL.createObjectURL(uploadFile);
        setImageData({ previewImage: previewImagePath, imageFile: uploadFile });
      } else {
        setImageData({ previewImage: "", imageFile: "" });
        setNewUserInfo({ ...newUserInfo, userImage: "" });
        return;
      }
      return;
    }

    if (type === "phoneNumber") {
      if (isNaN(Number(event.target.value))) {
        return;
      }
    }

    checkValidation(type, event.target.value);
    setNewUserInfo({ ...newUserInfo, [type]: event.target.value });
  };

  const [isDuplicated, setIsDuplicated] = useState({ nickname: true, username: true, phoneNumber: true });

  const updateNewInfo = async (event) => {
    event.preventDefault();

    console.log(changeInfoType);
    try {
      const response = await instance.get(`/user/checkUsername/${newUserInfo.username}`);
      setIsDuplicated({ ...isDuplicated, username: response.data });
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await instance.get(`/user/checkNickname/${newUserInfo.nickname}`);
      setIsDuplicated({ ...isDuplicated, nickname: response.data });
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await instance.get(`/user/checkPhoneNumber/${newUserInfo.phoneNumber}`);
      setIsDuplicated({ ...isDuplicated, phoneNumber: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  let content = "";

  if (step === 0) {
    content = (
      <>
        <Profile>
          <img src={userInfo.img} alt="프로필 이미지" />
          <div onClick={() => handleMoveStep(2)}>
            <span>{nickname}</span>
            <Icon>
              <AiOutlineRight />
            </Icon>
          </div>
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
        <UpdateForm active={isActiveBtn} onSubmit={(event) => isActiveBtn && updateNewInfo(event)}>
          <span>이메일</span>
          <input
            className="input"
            value={newUserInfo.username}
            onChange={(event) => handleEnteredInfo(event, "username")}
            type="text"
            placeholder="이메일을 입력해주세요."
          />
          {!validation.username && <p>*이메일 형식이 유효하지 않아요.</p>}
          <span>닉네임</span>
          <input
            className="input"
            value={newUserInfo.nickname}
            onChange={(event) => handleEnteredInfo(event, "nickname")}
            type="text"
            placeholder="닉네임을 입력해주세요."
          />
          {newUserInfo.nickname.length !== 0 && !validation.nickname && <p>*영문자, 한글, 숫자, 3~10글자</p>}
          <span>휴대폰 번호</span>
          <input
            className="input"
            value={newUserInfo.phoneNumber}
            onChange={(event) => handleEnteredInfo(event, "phoneNumber")}
            type="text"
            placeholder="휴대폰 번호를 입력해주세요."
            maxLength={11}
          />
          {newUserInfo.phoneNumber.length !== 0 && !validation.phoneNumber && (
            <p>*휴대폰 번호 형식이 유효하지 않아요.</p>
          )}
          <span>인증번호</span>
          <input
            className="input"
            // value={newUserInfo.phoneNumber}
            // onChange={(event) => handleEnteredInfo(event, "phoneNumber")}
            type="text"
            placeholder="인증번호를 입력해주세요."
          />
          <button className="submitNewInfo" onClick={(event) => isActiveBtn && updateNewInfo(event)}>
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
                <Content key={p.boardMainId}>
                  <img
                    src={p.img[0].url}
                    alt="자랑하기 글 이미지"
                    onClick={() => navigate(`/post/detail/${p.boardMainId}`)}
                  />
                </Content>
              ))
            ) : (
              <span>작성한 글이 없어요.</span>
            ))}
          <InnerWrap mode="community" active={tap}>
            {step === 0 &&
              tap === "community" &&
              (contents.community?.length ? (
                contents.community.map((item) => <CommunityCard key={item.boardMainId} data={item} />)
              ) : (
                <span>작성한 커뮤니티 글이 없어요.</span>
              ))}
          </InnerWrap>
          <InnerWrap mode="together" active={tap}>
            {step === 0 &&
              tap === "together" &&
              (contents.together?.length ? (
                contents.together.map((item) => <TogetherCard key={item.boardMainId} data={item} />)
              ) : (
                <span>작성한 함께하기 글이 없어요.</span>
              ))}
          </InnerWrap>
          {step === 0 &&
            tap === "reels" &&
            (contents.reels?.length ? (
              contents.reels.map((p) => (
                <Content key={p.boardMainId}>
                  {/* <img src={p.titleImg} alt='릴스 이미지' onClick={() => navigate(`/reels/detail/${p.boardMainId}`)} /> */}
                  {/* 일단 링크 대기중 */}
                  <img src={p.titleImg} alt="릴스 이미지" />
                </Content>
              ))
            ) : (
              <span>작성한 릴스가 없어요.</span>
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
  input {
    background-color: ${(props) => props.theme.color.grey};
  }
  button {
    background-color: ${(props) => props.theme.color.main};
  }
  input,
  button {
    font-size: 1.6rem;
    border-radius: 10px;
  }
  p {
    display: inline-block;
    margin: 1% 0 3% 0;
    color: red;
  }
  .input {
    margin: 1% 0;
  }
  .submitNewInfo {
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
`;

const Content = styled.div`
  width: 25%;
  height: 24.88vw;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

const Profile = styled.div`
  display: flex;
  position: relative;
  width: 20%;
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
  div {
    margin: 12% 0;
    cursor: pointer;
  }
  span {
    display: block;
    font-size: 2rem;
    margin: 0 7%;
  }
`;

const Icon = styled.div`
  position: absolute;
  right: ${(props) => (props.type === "plus" ? "-7%" : "0%")};
  bottom: ${(props) => (props.type === "plus" ? "-20%" : "-1%")};
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
