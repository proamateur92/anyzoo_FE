import React from "react";

import styled, { keyframes } from "styled-components";
import { MdOutlineSwipe } from "react-icons/md";

const SwipeGuide = (props) => {
  return (
    <Outer>
      <Circle>
        <MdOutlineSwipe/>
      </Circle>
    </Outer>
  )
}

export default SwipeGuide

const Outer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const OpenAnimation = keyframes`
0% {
  visibility: visible;
  font-size: 1rem;
  height: 1rem;
  width: 1rem;
}

10% {
  height: 7rem;
  width: 7rem;
  font-size: 3rem;
}

30% {
  transform: rotate(-45deg)
}

60% {
  transform: rotate(45deg)
}

90% {
  transform: rotate(-45deg)
  visibility: visible;
}

100% {
  visibility: hidden;
}
`

const Circle = styled.div`
visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 7rem;
  width: 7rem;
  border-radius: 5rem;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 3rem;

  animation: ${OpenAnimation} 2s ease-in ;
  animation-iteration-count: 1;
`