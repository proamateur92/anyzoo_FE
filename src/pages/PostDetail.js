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
import { IoHeartOutline, IoChatbubbleOutline, IoHeart } from "react-icons/io5";

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
        <HeadBtn>
          <Back
            onClick={() => {
              navigate(-1);
            }}
            src={require("../assets/images/back.png.png")}
          />
          <HeadTitle>
            <p>자랑하개</p>
            <span>{data?.postCategory}</span>
          </HeadTitle>
          <JumMom>
            <IoMdMore
              id="optionMenu"
              onClick={menuOpen}
              style={{ marginLeft: "80%" }}
            />
            {bubbleOn ? (
              <div>
                <EditBubble
                  data={data}
                  contentsId={data?.boardMainId}
                  setBubbleOn={setBubbleOn}
                  page={"post"}
                />
              </div>
            ) : null}
          </JumMom>
        </HeadBtn>
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
        {/* <Reactions>
          <span>
            {like === true ? (
              <IoHeartOutline onClick={clickHeart} />
            ) : (
              <IoHeart style={{ color: "red" }} onClick={clickHeart} />
            )}
            <span>{data?.likeCnt}</span>{" "}
          </span>
          <span>
            <IoChatbubbleOutline /> {data?.viewCnt}{" "}
          </span>
        </Reactions> */}
        <PostResponses
          boardMainId={data?.boardMainId}
          likeCnt={data?.likeCnt}
        />
      </All>

      <Comment postId={params.id} />
    </Wrap>
  );
};

const Header = styled.div`
  display: flex;
  width: 83%;
  height: 70px;
  margin: 7% 5% 0 5%;
`;

const HeadBtn = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Back = styled.img`
  height: 30%;
  margin-left: 6%;
  margin-top: 1%;
`;

const HeadTitle = styled.div`
  text-align: center;
  width: 40%;
  margin-left: 29%;
  margin-top: 1%;

  /* margin-top: -50px; */

  p {
    margin: 1.5%;
    font-size: 1.65rem;
    font-weight: bold;
  }

  span {
    font-size: 1.2rem;
    opacity: 0.6;
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
`;

const User = styled.div`
  display: flex;
  width: 50%;
`;

const UserImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100px;
`;

const UserName = styled.span`
  font-size: 1.2rem;
  width: 70%;
  margin: 4%;
`;

const JumMom = styled.div`
  position: relative;
  font-size: 25px;
  z-index: 10;
  width: 50%;
`;

const ImgBox = styled.div`
  display: flex;

  /* overflow-x: hidden; */

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
  width: 90%;
  margin-left: 4%;
  margin-top: 2%;
  margin-bottom: 2%;
  line-height: 1.8;
  font-size: 1.25rem;
`;

const Reactions = styled.div`
  padding-top: 0.9375rem;

  span {
    margin-right: 1.2rem;
    font-size: 1.5rem;
  }
`;

export default PostDetail;
