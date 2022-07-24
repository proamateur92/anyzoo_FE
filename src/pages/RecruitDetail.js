// react
import React, { useEffect, useState } from "react";

// components
import Comment from "../components/Comment";

// elements
import Wrap from "../elements/Wrap";
import EditBubble from "../elements/EditBubble";

// style
import styled from "styled-components";

// router
import { useParams, useNavigate } from "react-router-dom";

// icon
import { IoMdMore } from "react-icons/io";
import { IoHeartOutline, IoChatbubbleOutline, IoHeart } from "react-icons/io5";

// axios
import instance from "../shared/axios";

const PostDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(); //Api에서 받은 데이터 변수 설정
  const [bubbleOn, setBubbleOn] = React.useState(false);
  const [like, setLike] = useState();

  const menuOpen = () => {
    setBubbleOn(!bubbleOn);
  };

  // axios에서 데이터를 받아오기
  useEffect(() => {
    instance.get("/api/together/" + params.id).then((response) => {
      setData(response.data); //useState의 data에 넣어준다.
      // console.log(response.data)
    });
  }, [params.id, like]);

  useEffect(() => {
    instance.get("/api/withpost/category/all?page=0").then((response) => {
      console.log(response.data);
    });
  }, []);

  const clickHeart = () => {
    instance.post("/api/heart/" + params.id).then((res) => {
      console.log(res);
      setLike(!like);
    });
  };

  useEffect(() => {
    instance.get("/api/heart/" + params.id).then((res) => {
      // console.log(res)
      setLike(res.data);
    });
  }, [params.id]);

  return (
    <Wrap>
      <div>
        <Back
          onClick={() => {
            navigate("/recuit");
          }}
          src={require("../assets/images/back.png.png")}
          alt=""
        />
      </div>
      <All>
        <UserInfo>
          <User>
            <UserImg src={data?.userProfileImg} alt="" />
            <UserName>{data?.nickname}</UserName>
          </User>
          <Jum>
            <JumMom>
              <IoMdMore id="optionMenu" onClick={menuOpen} />
              {bubbleOn ? (
                <EditBubble
                  data={data}
                  contentsId={data?.boardMainId}
                  setBubbleOn={setBubbleOn}
                  page={"recruit"}
                />
              ) : null}
            </JumMom>
          </Jum>
        </UserInfo>
        <ImgBox>
          {data?.img.map((v) => {
            return (
              <ImgCard key={v.id}>
                <MainImg src={v.url} />
              </ImgCard>
            );
          })}
        </ImgBox>
        <Content>{data?.contents}</Content>
        <Reactions>
          <span>
            {like === true ? (
              <IoHeartOutline onClick={clickHeart} />
            ) : (
              <IoHeart onClick={clickHeart} />
            )}
            <span>{data?.likeCnt}</span>{" "}
          </span>
          <span>
            <IoChatbubbleOutline /> {data?.viewCnt}{" "}
          </span>
        </Reactions>
      </All>
      {box === true ? (
        <ChatBox>
          <BtnBox>
            <ChatBtn onClick={changeBox}>
              <span>^</span>
            </ChatBtn>
          </BtnBox>

          <InfoAll>
            <Info>
              <InfoUser>
                <InfoUserImg src={data?.userProfileImg} alt="" />
                <p>{data?.nickname}</p>
              </InfoUser>
              <Location>
                <Gu>
                  <span>#중랑구</span>
                </Gu>
                <Gu>
                  <span>#망우동</span>
                </Gu>
              </Location>
            </Info>
          </InfoAll>
        </ChatBox>
      ) : (
        <JengBo>
          <ChatB onClick={changeBox}>
            <span>˅</span>
          </ChatB>
          <JengBoUser>
            <div>
              <JengBoUserImg src={data?.userProfileImg} alt="" />
              <p>{data?.nickname}</p>
            </div>
          </JengBoUser>
          <JengBoLocation>
            <Dong>
              <span>#중랑구</span>
            </Dong>
            <Gu>
              <span>#망우동</span>
            </Gu>
          </JengBoLocation>
          <Chatting>
            <AddBtn>채팅하기</AddBtn>
          </Chatting>
          <Recruitment>
            <div>
              <p>모집 마감 00:00:00</p>
            </div>
            <div>
              <img src={require("../assets/images/캡처.PNG")} /> <p>7/10</p>
            </div>
          </Recruitment>
        </JengBo>
      )}
    </Wrap>
  );
};

const Back = styled.img`
  height: 30px;
  padding: 20px;
`;

const All = styled.div`
  padding: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const User = styled.div`
  display: flex;
`;

const UserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  border: solid 1px black;
`;

const UserName = styled.span`
  font-size: 30px;
  margin-top: 10px;
  margin: 10px;
`;

const Jum = styled.div``;

const JumMom = styled.div`
  position: relative;
  font-size: 30px;
  margin-top: 10px;
`;

const ImgBox = styled.div`
  display: flex;
  overflow: auto;
  scroll-snap-type: x mandatory;
  width: 80%;
  height: 60%;
  margin: 0 10%;
  border-radius: 10px;
`;

const ImgCard = styled.div`
  flex: none;
  scroll-snap-align: start;
  width: 100%;
  height: 98%;
`;

const MainImg = styled.img`
  padding: 10px;
  width: 90%;
  display: block;
  height: 90%;
`;

const Content = styled.p`
  padding: 20px;
  margin-left: 10px;
`;

const Reactions = styled.div`
  padding-top: 15px;
  border-top: 1px solid #eee;

  span {
    margin-right: 10px;
  }
`;

const ChatBox = styled.div`
  position: fixed;
  width: 100%;
  max-width: 600px;
  height: 11vh;
  bottom: 90px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 100;
`;

const BtnBox = styled.div`
  height: 40px;
`;

const ChatBtn = styled.button`
  height: 100%;
  right: 12%;
  width: 48px;
  font-size: 30px;
  font-weight: 300;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  background-color: #44dcd3;
  color: black;
  margin-left: 76%;
  padding-top: 5px;
`;

const InfoAll = styled.div`
  box-shadow: 0 -5px 10px -4px gray;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  height: 40px;
  width: 100%;
  padding: 0 10% 0 10%;
  display: block;
`;

const Info = styled.div`
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  height: 4.3vh;
  width: 100%;
  padding: 3% 0 0 0;
  display: flex;
`;

const InfoUserImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100px;
  border: solid 1px black;
`;

const InfoUser = styled.div`
  width: 60%;
  display: flex;

  p {
    font-size: clamp(8px, 3.67vw, 16px);
    width: 70%;
    margin: 3.2% 0 0 5%;
  }
`;

const Location = styled.div`
  width: 40%;
  display: flex;
`;

const Gu = styled.div`
  width: 45%;
  height: 35px;
  border: 1px solid gray;
  margin: 0 2% 0 2%;
  text-align: center;
  line-height: 33px;
  border-radius: 30px;

  span {
    opacity: 0.7;
    font-size: 13px;
  }
`;
const Dong = styled.div`
  width: 45%;
  height: 35px;
  border: 1px solid gray;
  margin: 0 2% 0 2%;
  text-align: center;
  line-height: 33px;
  border-radius: 30px;

  span {
    opacity: 0.7;
    font-size: 13px;
  }
`;

const JengBo = styled.div`
  position: fixed;
  width: 100%;
  max-width: 600px;
  height: 26vh;
  bottom: 90px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 100;
  border-radius: 30px;
  box-shadow: 0 -5px 10px -4px gray;
`;

const ChatB = styled.button`
  position: fixed;
  height: 45px;
  width: 48px;
  font-size: 30px;
  font-weight: 300;
  border-bottom-right-radius: 25px;
  border-bottom-left-radius: 25px;
  background-color: #44dcd3;
  color: black;
  margin-left: 76%;
  padding-top: 10px;
`;

const JengBoUser = styled.div`
  width: 100%;
  height: 50px;
  display: flex;

  margin: 35px 0 0 0;

  div {
    margin: auto;

    width: 42%;
    display: flex;
  }

  p {
    font-size: clamp(8px, 4.67vw, 16px);
    width: 50%;
    margin: auto;
    margin-left: 1%;
  }
`;

const JengBoUserImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  margin: auto;
`;

const JengBoLocation = styled.div`
  width: 40%;
  display: flex;
  margin: auto;
`;

const Chatting = styled.div`
  width: 50%;
  height: 21%;
  margin: 10px 25% 0 25%;
`;

const AddBtn = styled.button`
  width: 100%;
  height: 100%;
  flex-grow: 0;
  font-weight: bold;
  border-radius: 10px;
  background-color: #44dcd3;
`;

const Recruitment = styled.div`
  display: flex;
  width: 50%;

  justify-content: space-between;
  margin: auto;
  margin-top: 2%;

  div {
    display: flex;
  }

  p {
    font-size: 16px;
    margin-top: 1px;
    opacity: 0.6;
  }

  img {
    height: 18px;
    margin-top: 1px;
  }

  span {
    font-size: 16px;
    margin-top: -2px;
    opacity: 0.6;
  }
`;

export default PostDetail;
