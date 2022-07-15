// react
import React from 'react';

// router
import { useNavigate } from 'react-router-dom';

// component
import EditBubble from "../elements/EditBubble";
import PhotoSlide from "./PhotoSlide";

// style
import styled from "styled-components";

// icon
import { IoMdMore } from "react-icons/io";
import { IoHeartOutline, IoChatbubbleOutline } from "react-icons/io5";

const PostCard = (props) => {
  const navigate = useNavigate();
  const postData = props.data;
  const boardMainId = props.data.boardMainId;
  const [bubbleOn, setBubbleOn] = React.useState(false);

  const cardWrapRef = React.useRef();
  const [cardWidth, setCardWidth] = React.useState(null);

  const [photoPg, setPhotoPg] = React.useState(0);

  React.useEffect(() => {
    setCardWidth(cardWrapRef?.current?.offsetWidth);
  }, [cardWrapRef?.current?.offsetWidth]);

  const menuOpen = () => {
    setBubbleOn(!bubbleOn);
  };

  return (
    <CardWrap ref={cardWrapRef} cardWidth={cardWidth}>
      <CardHeader>
        <UserInfo>
          <UserProfile img={postData.userProfileImg} cardWidth={cardWidth} />
          <span id="nickname"> {postData.nickname} </span>
        </UserInfo>

        <IoMdMore id='optionMenu' onClick={menuOpen} />
        {bubbleOn ? <EditBubble contentsId={boardMainId} setBubbleOn={setBubbleOn} /> : null}
      </CardHeader>

      <Contents>
        <ImgPreview>
          <PhotoSlide photos={postData.img} setPhotoPg={setPhotoPg} clickAction={() => navigate("/post/detail/" + boardMainId)}/>
        </ImgPreview>
        <TextPreview onClick={() => navigate("/post/detail/" + boardMainId)}> 
          { postData.contents?.substr(0,13)}
          { postData.contents?.length > 13 ? "…" : null } 
        </TextPreview>
      </Contents>

      <Reactions>
        <span>
          <IoHeartOutline /> {postData.likeCnt}
        </span>

        <span>
          <IoChatbubbleOutline /> {postData.likeCnt}
        </span>
      </Reactions>
    </CardWrap>
  );
};

export default PostCard;

const CardWrap = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: ${(props) => props.cardWidth * 0.84}px;
  margin: auto;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  width: 80%;
  height: 19%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.6rem;
  position: relative;

  #optionMenu {
    color: #919191;
    font-size: 2.2rem;
    cursor: pointer;
  }
`;

const UserInfo = styled.span`
  display: flex;
  align-items: center;
  margin: 0px;
`;

const UserProfile = styled.span`
  width: ${(props) => props.cardWidth * 0.08}px;
  height: ${(props) => props.cardWidth * 0.08}px;
  border-radius: 100px;
  margin-right: 1.2rem;
  background: url(${(props) =>
    props.img
      ? props.img
      : 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FopbGC%2FbtrF9ZNhpja%2FY026LUE8lwKcGmfqJiO3SK%2Fimg.png'});
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
  display: flex;
  align-items: center;
  overflow: hidden;
  font-size: 1.4rem;
  color: #666;
`;

const Reactions = styled.div`
  display: flex;
  align-items: center;
  height: 12.7%;
  padding: 0px 10%;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  color: #B3B3B3;
  font-size: 1.5rem;

  span {
    margin-right: 1.1rem;
  }
`;
