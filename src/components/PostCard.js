import React from "react";

// 컴포넌트
import EditBubble from "../elements/EditBubble";

// CSS 관련 임포트
import styled from "styled-components";
import { IoMdMore } from "react-icons/io";
import { IoHeartOutline, IoChatbubbleOutline } from "react-icons/io5";

const PostCard = (props) => {
  const PostData = props.data


  return (
    <CardWrap>
      <CardHeader>
        <UserInfo>
          <div id="profileImg" />
          <span id="nickName">닉네임</span>
        </UserInfo>
        <IoMdMore/>
        <EditBubble/>
      </CardHeader>

      <ImgPreview />
      <TextPreview> 텍스트 영역</TextPreview>

      <Reactions>
        <span><IoHeartOutline/> 777 </span>
        <span><IoChatbubbleOutline/> 777 </span>
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

const ImgPreview = styled.div`
  width: 100%;
  height: 310px;
  background: url( 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FopbGC%2FbtrF9ZNhpja%2FY026LUE8lwKcGmfqJiO3SK%2Fimg.png');
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
  padding-top : 15px;
  border-top: 1px solid #eee;

  span {
    margin-right: 10px;
  }
`