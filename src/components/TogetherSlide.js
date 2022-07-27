import React from "react";

// style
import styled from "styled-components";

import TogetherCard from '../components/TogetherCard';

import { useSelector, useDispatch } from "react-redux";
import { loadPostsDB as loadTogether } from "../redux/modules/recruitSlice";

const TogetherSlide = () => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.recruit.list);

  React.useEffect(()=>{
    const pageInfo = { page: 0, provinceId: 'all'};
    dispatch(loadTogether(pageInfo))
  },[dispatch])

  return (
  <SlideWrap>
    {data.map((cardData) => (
      <TogetherCard data={cardData} key={cardData.boardMainId}/>
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