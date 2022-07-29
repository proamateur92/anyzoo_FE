// react
import React from "react";

// router
import { useNavigate } from "react-router-dom";

// component
import PhotoSlide from "./PhotoSlide";
import PostResponses from "./PostResponses";

//element
import EditBubble from "../elements/EditBubble";

// style
import styled from "styled-components";

// icon
import { IoMdMore } from "react-icons/io";


const PostCard = (props) => {
  const navigate = useNavigate();
  const postData = props.data;
  const boardMainId = props.data.boardMainId;
  const [bubbleOn, setBubbleOn] = React.useState(false);

  const cardWrapRef = React.useRef();

  const menuOpen = () => {
      setBubbleOn(!bubbleOn);
  };

  return (
    <OuterWrap>
      <CardWrap ref={cardWrapRef}>
        <CardHeader>
          <UserInfo>
            <UserProfile img={postData.userProfileImg}/>
            <p>
              <span className="grade"> Purple </span>
              {postData.nickname}
            </p>
          </UserInfo>

          <IoMdMore id="optionMenu" onClick={menuOpen} />
          {bubbleOn ? <EditBubble data={postData} setBubbleOn={setBubbleOn} /> : null}
        </CardHeader>

        <Contents>
          <ImgPreview>
            <PhotoSlide photos={postData.img} clickAction={() => navigate("/post/detail/" + boardMainId)} />
          </ImgPreview>
          <TextPreview onClick={() => navigate("/post/detail/" + boardMainId)}>
            <span>{postData.contents}</span>
          </TextPreview>
        </Contents>

        <PostResponses boardMainId={boardMainId} likeCnt={postData.likeCnt}/>
        
      </CardWrap>
    </OuterWrap>
  );
};

export default PostCard;

const OuterWrap = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding-top: 84%;
  position: relative;
`;

const CardWrap = styled.div`
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  margin: auto;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  position: absolute;
`;

const CardHeader = styled.div`
  width: 80%;
  height: 19%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.8rem;
  position: relative;

  #optionMenu {
    color: #919191;
    font-size: 2.4rem;
    cursor: pointer;
  }
`;

const UserInfo = styled.span`
  display: flex;
  align-items: center;
  margin: 0px;
  width: 95%;
  flex-shrink: 0;

  p {
    color: #333;
    font-size: 1.8rem;
    display: flex;
    align-items: center;
  }

  .grade {
    background: #6946b2;
    color: white;
    font-size: 1rem;
    font-weight: 100;
    padding: 0.29rem 0.8rem 0.41rem 0.9rem;
    border-radius: 3rem;
    margin-right: 0.6rem;
  }
`;

const UserProfile = styled.span`
  width: 10%;
  padding-top: 10%;
  border-radius: 100px;
  margin-right: 1.2rem;
  background: url(${(props) =>
    props.img
      ? props.img
      : "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FopbGC%2FbtrF9ZNhpja%2FY026LUE8lwKcGmfqJiO3SK%2Fimg.png"});
  background-size: cover;
  background-position: center;
`;

const Contents = styled.div`
  cursor: pointer;
  margin: auto;
  width: 80%;
  height: 68.25%;
`;

const ImgPreview = styled.div`
  width: 100%;
  height: 79.07%;
  border-radius: 2rem;
  margin: auto;

  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  border: 1px solid #eee;
  overflow: hidden;
`;

const TextPreview = styled.p`
  height: 20.93%;
  width: 72.33%;
  display: flex;
  align-items: center;
  overflow: hidden;
  font-size: 1.6rem;
  color: #666;

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;