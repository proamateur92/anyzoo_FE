// router
import { useNavigate } from "react-router-dom";

// react
import React from "react";

// redux
import { useDispatch, useSelector } from "react-redux";

// axios
import instance from "../shared/axios";

//element
import Bubble from "./Bubble";

// postSlice
import { removeDataDB } from "../redux/modules/postSlice";
import styled from "styled-components";

const EditBubble = (props) => {
  const user = useSelector((state) => state.user.info);
  const [isWriter, setIsWriter] = React.useState(false);
  const navigate = useNavigate();
  const data = props.data;
  const contentsId = props.data?.boardMainId;
  const setBubbleOn = props.setBubbleOn;
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (user?.nickname === data?.nickname) {
      setIsWriter(true);
    }
  }, [user, data?.nickname]);

  const moveToEdit = () => {
    switch (data.boardKind) {
      case "POST":
        navigate("/post/update/" + contentsId);
        break;

      case "REELS":
        navigate('/reels/write/' + contentsId)
        break;

      default:
        return null;
    }
  };

  const deleteAction = (e) => {
    e.preventDefault();
    if (window.confirm("정말 삭제하시겠어요?")) {
      switch (data.boardKind) {
        case "POST":
          dispatch(removeDataDB(contentsId)) //removeDateDB에 id 전달해줌.
          .then((res)=> {
            console.log(res) 
            setBubbleOn(false)
          }); 
          break;

        case "REELS":
          instance.delete('/api/reels/'+contentsId)
          .then((res)=> {
            console.log(res) 
            setBubbleOn(false)
          })
          break;

        default:
          return null;
      }
    }
  };

  const followAction = () => {};

  return (
    <Bubble setBubbleOn={setBubbleOn}>
      {isWriter ? (
        <>
          <Option onClick={(e) => moveToEdit()}> 수정하기</Option>
          <Option onClick={(e) => deleteAction(e)} style={{ color: "red" }}>
            삭제하기
          </Option>
        </>
      ) : (
        <Option onClick={() => followAction}>팔로우</Option>
      )}
    </Bubble>
  );
};

export default EditBubble;

const Option = styled.p`
  color: #333;
`