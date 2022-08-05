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

// style
import Swal from "sweetalert2";

// postSlice
import { removeDataDB as postRemove } from "../redux/modules/postSlice";
import { removeDataDB as communityRemove } from "../redux/modules/communitySlice";
import { removeDataDB as recruitRemove } from "../redux/modules/recruitSlice";
import { addFollowingListDB, removeFollowingListDB } from "../redux/modules/userSlice";

const EditBubble = (props) => {
  const user = useSelector((state) => state.user.info);
  const followingInfo = useSelector((state) => state.user?.followingList);
  const [isWriter, setIsWriter] = React.useState(false);
  const navigate = useNavigate();
  const data = props.data;
  const contentsId = props.data?.boardMainId;
  const page = props.page;
  const setBubbleOn = props.setBubbleOn;
  const direction = props.direction;
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (user?.nickname === data?.nickname) {
      setIsWriter(true);
    }
  }, [user, data?.nickname]);

  const moveToEdit = () => {
    switch (data.boardKind) {
      case "REELS":
        navigate("/reels/write/" + contentsId);
        break;

      default:
        return navigate("/" + page + "/update/" + data?.boardMainId);
    }
  };

  const deleteAction = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "정말 삭제하시겠어요?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니요",
      confirmButtonColor: "#44DCD3",
    }).then((result) => {
      if (result.isConfirmed) {
        switch (data.boardKind) {
          case "POST":
            dispatch(postRemove(data?.boardMainId)) //removeDateDB에 id 전달해줌.
              .then((res) => {
                console.log(res);
                setBubbleOn(false);
              });
            break;

          case "COMMUNITY":
            dispatch(communityRemove(data?.boardMainId));
            break;

          case "Together":
            dispatch(recruitRemove(data?.boardMainId));
            break;

          case "REELS":
            instance
              .delete("/api/reels/" + contentsId)
              .then((res) => {
                setBubbleOn(false);
                Swal.fire({
                  title: "삭제되었어요.",
                  icon: "success",
                  confirmButtonText: "확인",
                  confirmButtonColor: "#44DCD3",
                });
                window.location.replace("/reels");
              })
              .catch((err) => {
                console.log(err);
                window.alert("문제가 발생했어요");
              });
            break;

          default:
            return null;
        }
      }
    });
  };

  const followAction = async (type, guide) => {
    try {
      await instance.post(`/api/follow/${props.targetNickname}`);
      if (type) {
        dispatch(addFollowingListDB(props.targetNickname));
      } else {
        dispatch(removeFollowingListDB(props.targetNickname));
      }
      Swal.fire({
        title: `${guide}`,
        icon: "success",
        confirmButtonText: "확인",
        confirmButtonColor: "#44DCD3",
      });
      setBubbleOn(false);
    } catch (error) {
      console.log(error);
    }
  };

  const checkFollowAction = (type) => {
    let msg = "";
    if (type) {
      msg = `${props.targetNickname}님을 팔로잉합니다.`;
    } else {
      msg = `${props.targetNickname}님의 팔로잉을 해제했어요.`;
    }

    Swal.fire({
      title: `${type ? "팔로잉할까요?" : "팔로잉을 해제할까요?"}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니요",
      confirmButtonColor: "#44DCD3",
    }).then((result) => {
      if (result.isConfirmed) {
        followAction(type, msg);
      }
    });
  };

  return (
    <Bubble setBubbleOn={setBubbleOn} direction={direction}>
      {isWriter ? (
        <>
          <Option onClick={(e) => moveToEdit()}> 수정하기</Option>
          <Option onClick={(e) => deleteAction(e)} style={{ color: "red" }}>
            삭제하기
          </Option>
        </>
      ) : (
        <Option
          onClick={() => checkFollowAction(followingInfo.indexOf(props.targetNickname) === -1)}
          followColor={followingInfo.indexOf(props.targetNickname) === -1}
        >
          {followingInfo.indexOf(props.targetNickname) === -1 ? "팔로우" : "팔로우 해제"}
        </Option>
      )}
    </Bubble>
  );
};

export default EditBubble;

const Option = styled.p`
  font-weight: 800;
  color: ${(props) => (props.followColor ? props.theme.color.main : "#666")};
  &:hover {
    color: ${(props) => (props.followColor ? "#37b0a9" : "#333")};
  }
`;
