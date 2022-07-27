import React from "react";

// style
import styled from "styled-components";

import TogetherCard from '../components/TogetherCard';


const TogetherSlide = () => {

  const data = [ {
    boardMainId: 1,
    title : "산책모집 방 제목",
    content : "모집글 내용이 들어갑니다. 모집글 내용이 들어갑니다.모집글 내용이 들어갑니다.",
    img : "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdCUQ7g%2FbtrHpn7Oxdq%2Fb5VN04Jr1ukG5rTvrWT8O0%2Fimg.png",
    limitPeople : "10",
    date : "3분 전",
    location : "머머구",
    peopleCnt : "7",
    createdAt : "3분 전"
 }]

  return (
  <SlideWrap>
    {data.map((post) => (
      <TogetherCard data={post} key={post.boardMainId}/>
    ))}
  </SlideWrap>
  )
}

export default TogetherSlide

const SlideWrap = styled.div`
  width: 91.73%;
  margin: 0.5rem auto;
  display: flex;
  gap: 1.5rem;
  flex-grow:0;
  overflow: auto;

  &::-webkit-scrollbar{
    display: none; 
}
`