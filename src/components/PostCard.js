import React from "react";

import { useNavigate } from "react-router-dom";

// 컴포넌트
import EditBubble from "../elements/EditBubble";

// CSS 관련 임포트
import styled from "styled-components";
import { IoMdMore } from "react-icons/io";
import { IoHeartOutline, IoChatbubbleOutline } from "react-icons/io5";

const PostCard = (props) => {
  const navigate = useNavigate();
  const postData = props.data.boardMain[0];
  const postId = props.data.postId;

  const [bubbleOn, setBubbleOn] = React.useState(false);

  const menuOpen = () => {
    setBubbleOn(!bubbleOn);
  };

  return (
    <CardWrap>
      <CardHeader>
        <UserInfo>
          <div id="profileImg" img={postData.user[0].img} />
          <span id="nickName"> {postData.user[0].nickname} </span>
        </UserInfo>
        <IoMdMore id="optionMenu" onClick={menuOpen} />
        {bubbleOn ? <EditBubble contentsId={postId} setBubbleOn={setBubbleOn} /> : null}
      </CardHeader>

      <Contents onClick={() => navigate('/post/detail/' + postId)}>
        <ImgPreview img={postData.imgURL[0]?.imgUrl} />
        <TextPreview> {postData.content} </TextPreview>
      </Contents>

      <Reactions>
        <span>
          <IoHeartOutline /> {postData.likeCnt}{" "}
        </span>
        <span>
          <IoChatbubbleOutline /> {postData.viewCnt}{" "}
        </span>
      </Reactions>
    </CardWrap>
  );
};

export default PostCard;

const CardWrap = styled.div`
  box-sizing: border-box;
  width: 90%;
  margin: auto;
  padding: 15px 10%;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  position: relative;

  #optionMenu {
    cursor: pointer;
  }
`;

const UserInfo = styled.span`
  display: flex;
  align-items: center;
  margin: 10px 0px;

  #profileImg {
    width: 30px;
    height: 30px;
    border-radius: 30px;
    margin-right: 12px;
    background: #eee;
  }
`;

const Contents = styled.div`
  cursor: pointer;
`

const ImgPreview = styled.div`
  width: 100%;
  height: 310px;
  background: url(${(props) =>
    props.img
      ? props.img
      : "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FopbGC%2FbtrF9ZNhpja%2FY026LUE8lwKcGmfqJiO3SK%2Fimg.png"});
  background-size: cover;
  background-position: center;
  margin: auto;
`;

const TextPreview = styled.p`
  margin: 15px 0px;
  height: 15px;
  overflow: hidden;
`;

const Reactions = styled.div`
  padding-top: 15px;
  border-top: 1px solid #eee;

  span {
    margin-right: 10px;
  }
`;
