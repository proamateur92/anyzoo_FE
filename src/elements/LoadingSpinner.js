// react
import React from "react";

// style
import styled from "styled-components";

// icon
import { FiLoader } from "react-icons/fi";

const LoadingSpinner = ( props ) => {
  const setSpinnerOn = props.setSpinner

  return (
    <BackDrop>
      <Spinner>
        <FiLoader/>
        <span> Loading... </span>
      </Spinner>
    </BackDrop>
  ) 
}

export default LoadingSpinner

const BackDrop = styled.div`
  position: fixed;
  z-index: 200;
  height: 100%;
  width: 100%;
  max-width: 600px;
  left: 50%;
  transform: translate(-50%, 0);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  -webkit-backdrop-filter: blur(1px);
  backdrop-filter: blur(1px);
  background-color: rgba(0, 0, 0, 0.3);
`;

const Spinner = styled.div`
  font-size: 3rem;
  color: #fff;
`