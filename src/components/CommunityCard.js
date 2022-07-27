import React from "react";

// style
import styled from "styled-components";

//component
import PostResponses from "./PostResponses";

// router
import { useNavigate } from "react-router-dom";


const CommunityCard = (props) => {
  const navigate = useNavigate();
  const data = props.data

    // 오늘 날짜 구해오기
    const today = new Date();
    const month = today.getMonth() > 9 ? today.getMonth() + 1 : "0" + (today.getMonth() + 1);
    const todayString = today.getFullYear() + "-" + month + "-" + today.getDate();

    const createdAt = data.dateTime;
    const createdAtDisplay =
      todayString !== createdAt?.split("T")[0]
        ? createdAt?.split("T")[0].substr(2)
        : createdAt?.split("T")[1].substr(0, 5);

  return (
    <CardWrap>
      <Header>
        <UserInfo>
          <UserProfile img={data.userProfileImg}/>
          <p>{data.nickname}</p>
        </UserInfo>
        <span>{createdAtDisplay}</span>
      </Header>

      <Content onClick={()=> navigate("/community/detail/"+data.boardMainId)}>
        {data.contents}
      </Content>

      <PostResponses boardMainId={data.boardMainId} likeCnt={data.likeCnt}/>

    </CardWrap>
  )
}


export default CommunityCard

const CardWrap = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  height: 16.5rem;
`

const Header = styled.div`
width: 80%;
margin: 1.6rem auto 1.2rem auto;
display: flex;
justify-content: space-between;
align-items: center;

  span{
    font-size: 1.2rem;
    color: #c2c2c2;
  }
`

const UserInfo = styled.div`
width: 80%;
display: flex;
align-items: center;
font-size: 1.2rem;
`

const UserProfile = styled.span`
  width: 2rem;
  padding-top: 2rem;
  border-radius: 2rem;
  margin-right: 0.7rem;
  background: url(${(props) =>
    props.img
      ? props.img
      : "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FopbGC%2FbtrF9ZNhpja%2FY026LUE8lwKcGmfqJiO3SK%2Fimg.png"});
  background-size: cover;
  background-position: center;
`;


const Content = styled.p`
  width: 80%;
  height: 40.6%;
  margin: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 1.29;

  font-size: 1.4rem;
  color: #666;
`