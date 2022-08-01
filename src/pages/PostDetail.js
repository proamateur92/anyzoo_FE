// react
import React, { useEffect, useState } from "react";

// components
import Comment from "../components/Comment";
import PhotoSlide from "../components/PhotoSlide";
import PostResponses from "../components/PostResponses";
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

const PostDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(); //Api에서 받은 데이터 변수 설정
  const [bubbleOn, setBubbleOn] = React.useState(false);
  const [like, setLike] = useState();
  const [test, setTest] = useState([
    "http://img.khan.co.kr/news/2019/11/29/l_2019112901003607500286631.jpg",
    "https://petnolza.com/wp-content/uploads/2021/11/dog-america-name.jpg",
  ]);

  const menuOpen = () => {
    setBubbleOn(!bubbleOn);
  };

  // axios에서 데이터를 받아오기
  useEffect(() => {
    instance.get("/api/post/" + params.id).then((response) => {
      setData(response.data); //useState의 data에 넣어준다.
      // console.log(response.data)
    });
  }, [params.id, like]);

  useEffect(() => {
    instance.get("/api/post/category/all?page=0").then((response) => {
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
      <Header>
        <Icon>
          <FiChevronLeft
            onClick={() => {
              navigate(-1);
            }}
          />
        </Icon>
        <Title>
          <p className="subtitle">자랑하개</p>
          <span>{data?.postCategory}</span>
        </Title>
        <BobbleBox>
          <Icon>
            <IoMdMore id="optionMenu" onClick={menuOpen} />
          </Icon>
          {bubbleOn ? (
            <Bubble>
              <EditBubble
                data={data}
                contentsId={data?.boardMainId}
                page={"post"}
                setBubbleOn={setBubbleOn}
                targetNickname={data?.nickname}
              />
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
        <ImgBox>
          <PhotoSlide photos={data?.img} />
        </ImgBox>
        <Content>{data?.contents}</Content>
      </All>
      <PostResponses boardMainId={data?.boardMainId} likeCnt={data?.likeCnt} />

      <Comment postId={params.id} />
    </Wrap>
  );
};

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
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
  span {
    display: block;
    margin-top: 4%;
    color: rgba(0, 0, 0, 0.4);
    font-size: 1.3rem;
    font-weight: bold;
  }
`;

const All = styled.div`
  margin: 0 10% 0 10%;
  height: 40vh;
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
  width: 2.875rem;
  height: 2.875rem;
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
  font-size: 25px;
  z-index: 10;
  width: 50%;
`;

const ImgBox = styled.div`
  display: flex;
  overflow-x: auto;
  /* overflow-x: hidden; */
  scroll-snap-type: x mandatory;
  width: 100%;
  height: 55%;
  margin-left: -1%;
  margin-top: 3%;
  border-radius: 20px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Content = styled.p`
  width: 90%;
  height: 29%;
  margin-left: 4%;
  margin-top: 2%;
  margin-bottom: 2%;
  line-height: 1.8;
  font-size: 1.45rem;
  color: #666;
  overflow: auto;
`;

export default PostDetail;
