import React from "react";

// style
import styled from "styled-components";

import FindMateCard from '../components/FindMateCard';

const FindMateSlide = () => {

  return (
  <SlideWrap>
    <FindMateCard className="card"/>
    <FindMateCard className="card"/>
    <FindMateCard className="card"/>
  </SlideWrap>
  )
}

export default FindMateSlide

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