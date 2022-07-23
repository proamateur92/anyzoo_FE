// react
import React from "react";

// style
import styled from 'styled-components';


const Bubble = (props) => {
  const setBubbleOn = props.setBubbleOn;

  const backDropClose = () => {
    setBubbleOn(false);
  };

  return (
    <>
      <BubbleWrap>
        { props.children }
      </BubbleWrap>
      <BackDrop onClick={backDropClose} />
    </>
  )
}

export default Bubble

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
`;

const BubbleWrap = styled.div`
  padding: 1.8rem;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 30px 0px 30px 30px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  font-size: 1.6rem;
  text-align: center;

  background: #fff;

  position: absolute;
  top: 55%;
  right: 3%;
  z-index: 10;

  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  p {
    cursor: pointer;

    :hover {
      font-weight: bold;
    }

    :active {
      font-weight: bold;
    }
  }
`;

