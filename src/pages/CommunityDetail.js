// react
import React, { useEffect, useState } from "react";

// components
import Comment from "../components/Comment";
import PostResponses from "../components/PostResponses";
// elements
import Wrap from "../elements/Wrap";
import EditBubble from "../elements/EditBubble";
import PhotoSlide from "../components/PhotoSlide";

// style
import styled from "styled-components";

// router
import { useParams, useNavigate } from "react-router-dom";

// icon
import { IoMdMore } from "react-icons/io";
import { IoHeartOutline, IoChatbubbleOutline, IoHeart } from "react-icons/io5";

// axios
import instance from "../shared/axios";

const CommunityDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(); //Api에서 받은 데이터 변수 설정
  const [bubbleOn, setBubbleOn] = React.useState(false);
  const [like, setLike] = useState();
  const [box, setBox] = useState(true);

  const menuOpen = () => {
    setBubbleOn(!bubbleOn);
  };

  // axios에서 데이터를 받아오기
  useEffect(() => {
    instance.get("/api/community/" + params.id).then((response) => {
      setData(response.data); //useState의 data에 넣어준다.
      console.log(response.data, "datatat");
    });
  }, [params.id, like]);

  useEffect(() => {
    instance.get("/api/community?page=0").then((response) => {
      console.log(response.data);
    });
  }, []);

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
            <p>커뮤니티</p>
          </HeadTitle>
          <JumMom>
            <IoMdMore
              id="optionMenu"
              onClick={menuOpen}
              style={{ marginLeft: "80%" }}
            />
            {bubbleOn ? (
              <EditBubble
                data={data}
                page={"community"}
                setBubbleOn={setBubbleOn}
              />
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
        {data?.img.length === 0 ? null : (
          <ImgBox>
            <PhotoSlide photos={data?.img} />
          </ImgBox>
        )}

        <Content>{data?.contents}</Content>
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
    font-size: 1.45rem;
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
  width: 2.875rem;
  height: 2.875rem;
  border-radius: 100px;
`;

const UserName = styled.span`
  font-size: 1.4rem;
  width: 70%;
  margin: 5%;
`;

const JumMom = styled.div`
  position: relative;
  font-size: 25px;
  opacity: 0.6;
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
  margin-left: 4%;
  margin-top: 2%;
  margin-bottom: 2%;
  line-height: 1.8;
  font-size: clamp(8px, 3.6vw, 20px);
`;

export default CommunityDetail;
