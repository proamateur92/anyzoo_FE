// router
import { useNavigate } from "react-router-dom";

// react
import React from "react";

// redux
import { useDispatch, useSelector } from "react-redux";

//element
import Bubble from "./Bubble";

// postSlice
import { removeDataDB } from "../redux/modules/postSlice";

const EditBubble = (props) => {
  const user = useSelector((state) => state.user.info);
  const [isWriter, setIsWriter] = React.useState(false);
  const navigate = useNavigate();
  const data = props.data
  const contentsId = props.data?.boardMainId;
  const setBubbleOn = props.setBubbleOn;
  const dispatch = useDispatch();

  console.log(data)

  React.useEffect(()=>{
    if (user?.nickname === data?.nickname) {
      setIsWriter(true)
    }
  }, [user, data?.nickname])


  const moveToEdit = () => {
    navigate("/post/update/" + contentsId);
  };

  const deleteAction = (e) => {
    e.preventDefault();
    dispatch(removeDataDB(contentsId)); //removeDateDB에 id 전달해줌.
    window.confirm("정말 삭제하시겠어요?");
  };

  const followAction = () => {

  }

  return (
    <Bubble setBubbleOn={setBubbleOn}>
      {isWriter ? (
        <>
          <p onClick={(e) => moveToEdit()}>수정하기</p>
          <p onClick={(e) => deleteAction(e)} style={{ color: "red" }}> 삭제하기
          </p>
        </>
      ) : (
        <p onClick={() => followAction}>팔로우</p>
      )}
    </Bubble>
  );
};

export default EditBubble;
