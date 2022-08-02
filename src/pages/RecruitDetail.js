// react
import React, { useEffect, useState } from "react";

// components
import PhotoSlide from "../components/PhotoSlide.js";
import PostResponses from "../components/PostResponses.js";
// elements
import Wrap from "../elements/Wrap";
import EditBubble from "../elements/EditBubble";

// style
import styled from "styled-components";

// router
import { useParams, useNavigate } from "react-router-dom";

// icon
import { IoMdMore } from "react-icons/io";
import { FiChevronLeft } from "react-icons/fi";

// axios
import instance from "../shared/axios";

import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const RecruitDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(); //Api에서 받은 데이터 변수 설정
  const [bubbleOn, setBubbleOn] = React.useState(false);
  const [like, setLike] = useState();
  const [box, setBox] = useState(true);
  const [lastDay, setLastDay] = useState();

  const menuOpen = () => {
    setBubbleOn(!bubbleOn);
  };

  // axios에서 데이터를 받아오기
  useEffect(() => {
    instance.get("/api/together/detail/" + params.id).then((response) => {
      setData(response.data); //useState의 data에 넣어준다.

      // console.log(response.data.dday);

      let timer = setInterval(() => {
        const masTime = new Date(response.data.dday);
        const todayTime = new Date();
        const diff = masTime - todayTime;

        const diffHour = Math.floor(diff / (1000 * 60 * 60));
        const diffMin = Math.floor((diff / (1000 * 60)) % 60);
        const diffSec = Math.floor((diff / 1000) % 60);

        // console.log(diff, diffHour, diffMin, diffSec);
        if (diff < 0) {
          const Dday = `00:00:00`;
          setLastDay(Dday);
          clearInterval(timer);
        } else if (diffHour < 10) {
          const Dday = `0${diffHour}:${diffMin}:${diffSec}`;
          setLastDay(Dday);
        } else if (diffMin < 10) {
          const Dday = `${diffHour}:0${diffMin}:${diffSec}`;
          setLastDay(Dday);
        } else if (diffSec < 10) {
          const Dday = `${diffHour}:${diffMin}:0${diffSec}`;
          setLastDay(Dday);
        } else if (diffHour && diffMin && diffSec >= 10) {
          const Dday = `${diffHour}:${diffMin}:${diffSec}`;
          setLastDay(Dday);
        }
      }, 1000);
    });
  }, [params.id, like]);

  useEffect(() => {
    instance.get("/api/together?page=0").then((response) => {
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
    instance.get("/api/heart/" + params.id).then((res) => {
      // console.log(res)
      setLike(res.data);
    });
  }, [params.id]);

  const changeBox = () => {
    setBox(!box);
  };

  return (
    <Wrap>
      <Header>
        <Icon>
          <FiChevronLeft
            onClick={() => {
              navigate(-1);
            }}
          />
        </Icon>
        <p className="subtitle">{data?.title}</p>
        <BobbleBox>
          <Icon>
            <IoMdMore id="optionMenu" onClick={menuOpen} />
          </Icon>
          {bubbleOn ? (
            <Bubble>
              <EditBubble data={data} page={"recruit"} setBubbleOn={setBubbleOn} targetNickname={data?.nickname} />
            </Bubble>
          ) : null}
        </BobbleBox>
      </Header>
      <All>
        <UserInfo>
          <User>
            <UserImg src={data?.userProfileImg} alt="" />
            <UserName>{data?.nickname}</UserName>
          </User>
        </UserInfo>
        {data?.img.length === 0 ? null : (
          <ImgBox>
            <PhotoSlide photos={data?.img} />
          </ImgBox>
        )}
      </All>
      <Content>{data?.contents}</Content>
      <PostResponses boardMainId={data?.boardMainId} likeCnt={data?.likeCnt} />
      {box === true ? (
        <ChatBox>
          <BtnBox>
            <ChatBtn onClick={changeBox}>
              <span>
                <FiChevronUp />
              </span>
            </ChatBtn>
          </BtnBox>
          <InfoAll>
            <Info>
              <InfoUser>
                <InfoUserImg src={data?.userProfileImg} alt="" />
                <p>{data?.nickname}</p>
              </InfoUser>
              <Location>
                <Gu>#{data?.cityName}</Gu>
                <Gu>#{data?.provinceName}</Gu>
              </Location>
            </Info>
          </InfoAll>
        </ChatBox>
      ) : (
        <JengBo>
          <ChatB onClick={changeBox}>
            <span>
              <FiChevronDown />
            </span>
          </ChatB>
          <AllJengBo>
            <JengBoUser>
              <div>
                <JengBoUserImg src={data?.userProfileImg} alt="" />
              </div>
              <span>{data?.nickname}</span>
            </JengBoUser>
            <JengBoLocation>
              <Gu>#{data?.cityName}</Gu>
              <Gu>#{data?.provinceName}</Gu>
            </JengBoLocation>
            <Chatting>
              {lastDay === "00:00:00" ? (
                <FinishBtn disabled="disabled">Comming soon</FinishBtn>
              ) : (
                <ChattingBtn disabled="disabled">Comming soon</ChattingBtn>
              )}
            </Chatting>
            <Recruitment>
              <div>
                <p>모집 마감 {lastDay}</p>
              </div>
              <div>
                <img src={require("../assets/images/캡처.PNG")} />{" "}
                <p>
                  {data?.peopleCnt}/{data?.limitPeople}
                </p>
              </div>
            </Recruitment>
          </AllJengBo>
        </JengBo>
      )}
    </Wrap>
  );
};

const BobbleBox = styled.div``;
const Bubble = styled.div`
  position: absolute;
  width: 40%;
  right: 5%;
`;
const Icon = styled.div`
  font-size: 3rem;
  color: #666;
  cursor: pointer;
`;
const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6.5% 2%;
  .subtitle {
    color: #666;
    font-size: 2rem;
    font-weight: bold;
  }
`;

const All = styled.div`
  color: #666;
  margin: 0 10% 0 10%;

  width: 80%;
`;

const UserInfo = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  margin-bottom: 5%;
`;

const User = styled.div`
  display: flex;
  width: 50%;
`;

const UserImg = styled.img`
  height: 2.875rem;
  width: 2.875rem;
  border-radius: 100px;
`;

const UserName = styled.span`
  font-size: 1.4rem;
  width: 70%;
  margin: 5%;
  color: #666;
`;

const JumMom = styled.div`
  position: relative;
  font-size: 1.5625rem;
  opacity: 0.6;
  z-index: 10;
  width: 90%;
`;

const ImgBox = styled.div`
  display: flex;
  overflow-x: auto;
  /* overflow-x: hidden; */
  scroll-snap-type: x mandatory;
  width: 100%;
  height: 22vh;
  margin-left: -1%;
  margin-top: 3%;
  border-radius: 20px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Content = styled.p`
  width: 80%;

  margin-left: 10%;
  margin-top: 2%;
  margin-bottom: 2%;
  line-height: 1.8;
  font-size: 1.45rem;
  color: #666;
  overflow: auto;
`;

const ChatBox = styled.div`
  position: fixed;
  width: 100%;
  max-width: 600px;
  height: 14%;
  bottom: 5.625rem;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 99;
  /* background-color: white; */
`;

const BtnBox = styled.div`
  height: 4rem;
  background-color: transparent;
`;

const ChatBtn = styled.button`
  display: flex;
  justify-content: center;
  height: 100%;
  right: 12%;
  width: 4rem;
  font-size: 2.1rem;
  font-weight: 300;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  background-color: #44dcd3;
  color: black;
  margin-left: 76%;
  padding-top: 0.3125rem;
`;

const InfoAll = styled.div`
  color: #666;
  box-shadow: 0 -5px 10px -4px gray;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  height: 100%;
  width: 100%;
  padding: 0 10% 0 10%;
  display: block;
  background-color: white;
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
  width: 1.875rem;
  height: 1.875rem;
  border-radius: 100px;
`;

const InfoUser = styled.div`
  width: 50%;
  display: flex;
  margin: auto;

  p {
    font-size: 1.2rem;
    width: 70%;
    margin: 2% 0 0 5%;
  }
`;

const Location = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  margin: auto;
`;

const Gu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45%;
  height: 100%;
  border: 1px solid gray;
  margin: auto;
  text-align: center;

  border-radius: 30px;

  span {
    opacity: 0.7;
    font-size: 1rem;
    height: 90%;
  }
`;

const JengBo = styled.div`
  color: #666;
  background-color: white;
  position: fixed;
  width: 100%;
  max-width: 600px;
  height: 32%;
  bottom: 5.45rem;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 99;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  box-shadow: 0 -5px 10px -4px gray;
`;

const AllJengBo = styled.div`
  height: 80%;
  margin-top: 8%;
`;

const ChatB = styled.button`
  position: fixed;
  height: 4rem;
  width: 4rem;
  font-size: 2.1rem;
  font-weight: 300;
  border-bottom-right-radius: 25px;
  border-bottom-left-radius: 25px;
  background-color: #44dcd3;
  color: black;
  margin-left: 76%;
  padding-top: 0.625rem;
  span {
  }
`;

const JengBoUser = styled.div`
  width: 40%;
  height: 25%;
  display: flex;
  margin: 2.1875rem 30% 0 30%;
  justify-content: center;
  div {
    border-radius: 100%;
    width: 42%;
    height: 100%;
    display: flex;
  }

  span {
    font-size: 1.4rem;
    width: 50%;
    margin: auto;
    margin-top: 10%;
    margin-left: 8%;
  }
`;

const JengBoUserImg = styled.img`
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 100px;
  margin: auto;
  margin-left: 40%;
`;

const JengBoLocation = styled.div`
  width: 40%;
  height: 18%;
  display: flex;
  margin: 0 30% 0 30%;
`;

const Chatting = styled.div`
  width: 50%;
  height: 25%;
  margin: 0.425rem 25% 0 25%;
`;

const FinishBtn = styled.button`
  width: 100%;
  height: 100%;
  flex-grow: 0;
  font-weight: bold;
  border-radius: 10px;

  background-color: #d3d3d3;
`;

const ChattingBtn = styled.button`
  width: 100%;
  height: 100%;
  flex-grow: 0;
  font-weight: bold;
  border-radius: 10px;

  background-color: #d3d3d3;
  /* background-color: #44dcd3; */
`;

const Recruitment = styled.div`
  display: flex;
  width: 50%;
  height: 10%;

  justify-content: space-between;
  margin: auto;
  margin-top: 2%;

  div {
    display: flex;
  }

  p {
    font-size: 1.2rem;
    margin-top: 0.0625rem;
    opacity: 0.6;
  }

  img {
    height: 1.125rem;
    margin-top: 0.0625rem;
  }

  span {
    font-size: 1rem;
    margin-top: -0.125rem;
    opacity: 0.6;
  }
`;

export default RecruitDetail;
