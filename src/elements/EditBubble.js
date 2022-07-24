// style
import styled from "styled-components";

// router
import { useNavigate } from "react-router-dom";

// react
import React from "react";

// redux
import { useDispatch } from "react-redux";

import instance from "../shared/axios";

// postSlice
import { removeDataDB as postRemove } from "../redux/modules/postSlice";
import { removeDataDB as communityRemove } from "../redux/modules/communitySlice";
import { removeDataDB as recruitRemove } from "../redux/modules/recruitSlice";

const EditBubble = (props) => {
  const navigate = useNavigate();
  const contentsId = data.boardMainId;
  const page = props.page;
  const setBubbleOn = props.setBubbleOn;
  const bubbleRef = React.useRef();
  const dispatch = useDispatch();
  const data = props.data;

  const backDropClose = () => {
    setBubbleOn(false);
  };

  const moveToEdit = () => {
    navigate("/" + page + "/update/" + contentsId);
  };

  const deleteAction = (e) => {
    e.preventDefault();
    if (data?.boardKind === "POST") {
      dispatch(postRemove(contentsId)); //removeDateDB에 id 전달해줌.
      window.confirm("정말 삭제하시겠어요?");
    } else if (data?.boardKind === "COMMUNITY") {
      dispatch(communityRemove(contentsId));
      window.confirm("정말 삭제하시겠어요?");
    } else if (data?.boardKind === "TOGETHER") {
      dispatch(recruitRemove(contentsId));
      window.confirm("정말 삭제하시겠어요?");
    }
  };

  return (
    <>
      <Bubble ref={bubbleRef}>
        <p onClick={() => moveToEdit()}>수정하기</p>
        <p onClick={(e) => deleteAction(e)} style={{ color: "red" }}>
          삭제하기
        </p>
      </Bubble>
      <BackDrop onClick={backDropClose} />
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
  top: 55%;
  right: 3%;
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
