import React from "react";

// style
import styled from "styled-components";

// icon
import { FiSend } from "react-icons/fi";



const SendBtn = (props) => {
  const action = props.onClick

  return (  
    <Circle onClick={action}>
      <FiSend/>
    </Circle>    
  )
}

export default SendBtn

const Circle = styled.div`
  position:absolute;
  right:0;
  top: 0;
  width: 4rem;
  height: 4rem;
  border-radius:4rem;
  background: #3cd9d0;

  display:flex;
  align-items:center;
  justify-content: center;

  font-size: 2rem;
  color:#fff;

  cursor:pointer;

`