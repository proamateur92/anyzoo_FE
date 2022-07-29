// react
import React from "react";

// style
import styled from "styled-components";

// router
import { useNavigate } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";

// axios
import instance from "../shared/axios";

//element
import Bubble from "./Bubble";

// postSlice
import { removeDataDB as postRemove } from "../redux/modules/postSlice";
import { removeDataDB as communityRemove } from "../redux/modules/communitySlice";
import { removeDataDB as recruitRemove } from "../redux/modules/recruitSlice";

const EditBubble = (props) => {
  const user = useSelector((state) => state.user.info);
  const [isWriter, setIsWriter] = React.useState(false);
  const navigate = useNavigate();
  const data = props.data;
  const contentsId = props.data?.boardMainId;
  const page = props.page;
  const setBubbleOn = props.setBubbleOn;
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (user?.nickname === data?.nickname) {
      setIsWriter(true);
    }
  }, [user, data?.nickname]);

  const moveToEdit = () => {
    switch (data.boardKind) {
      case "REELS":
        navigate('/reels/write/' + contentsId)
        break;

      default:
        return navigate("/" + page + "/update/" + data?.boardMainId)
    }
  };

  const deleteAction = (e) => {
    e.preventDefault();
    if (window.confirm("정말 삭제하시겠어요?")) {
      switch (data.boardKind) {
        case "POST":
          dispatch(postRemove(data?.boardMainId)) //removeDateDB에 id 전달해줌.
          .then((res)=> {
            console.log(res) 
            setBubbleOn(false)
          }); 
          break;
        
        case "COMMUNITY" :
          dispatch(communityRemove(data?.boardMainId));
          break;
        
        case "Together" :
          dispatch(recruitRemove(data?.boardMainId));
          break;

        case "REELS":
          instance.delete('/api/reels/'+contentsId)
          .then((res)=> {
            setBubbleOn(false)
            window.alert('삭제되었습니다') 
            window.location.replace('/reels')
          }).catch((err) => {
            console.log(err)
            window.alert('문제가 발생했어요')
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