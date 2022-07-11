// style
import styled from "styled-components";
 
import { useNavigate } from "react-router-dom";
import React from "react";

const EditBubble = (props) => {
  const navigate = useNavigate();
  const contentsId = props.contentsId;
  const setBubbleOn = props.setBubbleOn;
  const bubbleRef = React.useRef();

  const backDropClose = () => {
      setBubbleOn(false);
  };

  const moveToEdit = () => {
    navigate("/post/update/" + contentsId);
  };

  const deleteAction = () => {
    window.confirm("정말 삭제하시겠어요?");
  };

  return (
    <>
    <Bubble ref={bubbleRef}>
      <p onClick={moveToEdit}>수정하기</p>
      <p onClick={deleteAction}>삭제하기</p>
    </Bubble>
    <BackDrop onClick={backDropClose}/>
    </>
  );
};

export default EditBubble;

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const Bubble = styled.div`
  width: 100px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 30px 0px 30px 30px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  font-size: 16px;
  text-align: center;

  background: #fff;

  position: absolute;
  top: 35px;
  right: 10px;
  z-index: 10;

  p {
    margin: 20px 0px;
    cursor: pointer;

    :hover {
      font-weight: bold;
    }

    :active {
      font-weight: bold;
    }
  }
`;
