import React from "react";

// style
import styled from "styled-components";

import { editCommentDB, deleteCommentDB } from "../redux/modules/commentSlice";

// redux
import { useDispatch, useSelector } from "react-redux";

import instance from "../shared/axios";

import ReComment from "../components/ReComment";

const OneComment = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.info);
  const data = props.commentData;
  // const postId = props.postId;
  const commentRef = React.useRef(null);
  const [openReplies, setOpenReplies] = React.useState(null);
  const [replyList, setReplyList] = React.useState(null);
  const [replyLength, setReplyLength] = React.useState(0);
  const isReply = props.isReply;
  const blockReply = props.blockReply

  // 대댓글리스트
  React.useEffect(() => {
    if (!isReply) {
      instance.get("/api/reply/" + data.id).then((res) => {
        setReplyList(res);

        if (res.data.length < 100) {
          setReplyLength(res.data.length);
        } else {
          setReplyLength('99+');
        }
        
      });
    }
  }, [isReply, data.id]);

  // 오늘 날짜 구해오기
  const today = new Date();
  const month = today.getMonth() > 9 ? today.getMonth() + 1 : "0" + (today.getMonth() + 1);
  const todayString = today.getFullYear() + "-" + month + "-" + today.getDate();

  const createdAt = props.commentData?.createdAt;
  const createdAtDisplay =
    todayString !== createdAt?.split("T")[0]
      ? createdAt?.split("T")[0].substr(5)
      : createdAt?.split("T")[1].substr(0, 5);


  // 코멘트 수정/삭제 메뉴
  const [isEditOptOpen, setIsEditOptOpen] = React.useState(false);
  const openEditOpt = () => {
    if (data.userNickname === user.nickname) {
      setIsEditOptOpen(!isEditOptOpen);
    }
  };

  // 코멘트 삭제하기
  const deleteComment = async () => {
    if (!isReply && data.userNickname === user.nickname) {
      await dispatch(deleteCommentDB(data.id));
      // dispatch(loadCommentsDB({ postId: postId, pgNo: 0 }));
    } else if (isReply && data.userNickname === user.nickname) {
      await instance.delete("/api/reply/edit/" + data.id);
    } else {
      window.alert("작성자만 삭제할수 있어요");
    }
  };

  // 코멘트 수정하기
  const [isEdit, setIsEdit] = React.useState(false);

  const startEdit = () => {
    if (data.userNickname === user.nickname) {
      setIsEdit(() => true);
    } else {
      window.alert("작성자만 수정할수 있어요");
    }
  };

  const editComment = async () => {
    if (!isReply && commentRef.current.value !== "") {
      await dispatch(
        editCommentDB({
          commentId: data.id,
          comment: commentRef.current.value,
        })
      );
      // dispatch(loadCommentsDB({ postId: postId, pgNo: 0 }));
    } else if (isReply && commentRef.current.value !== "") {
      await instance.patch("/api/reply/edit/" + data.id, { reply: commentRef.current.value });
    } else {
      window.alert("내용을 입력해주세요");
    }

    commentRef.current.value = "";
    setIsEdit(false);
    setIsEditOptOpen(false);
  };

  React.useEffect(() => {
    if (isEdit) {
      commentRef.current.value = isReply ? data.reply : data.comment;
      commentRef.current.focus();
    }
  }, [isEdit, data.comment]);

  return (
    <CommentWrap>
      <UserInfo>
        <ProfileImg img={data.userUserImage?.url} />
        <span> {data.userNickname} </span>
      </UserInfo>

      {isEdit ? (
        <Content>
          <EditArea>
            <textarea ref={commentRef} />
          </EditArea>
          <EditBtn onClick={() => editComment()}> 수정 </EditBtn>
        </Content>
      ) : (
        <Content>
          <TextBubble onClick={() => openEditOpt()}>
            <span> {isReply ? data.reply : data.comment} </span>
          </TextBubble>
          <Time> {createdAtDisplay} </Time>
          {isReply || blockReply ? null : <Replies onClick={() => setOpenReplies(!openReplies)}> 답글 {replyLength} </Replies>}
        </Content>
      )}

      {openReplies ? <ReComment originalData={data} replyList={replyList} setOpenReplies={setOpenReplies}/> : null}

      {isEditOptOpen ? (
        <EditOption>
          <span onClick={() => startEdit()}> 수정 </span>
          &#124;
          <span onClick={() => deleteComment()}> 삭제 </span>
        </EditOption>
      ) : null}
    </CommentWrap>
  );
};

const CommentWrap = styled.div`
  min-height: 8rem;
  margin-bottom: 1rem;
`;

const UserInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;

  span {
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

const ProfileImg = styled.div`
  width: 9.52%;
  padding-top: 9.52%;
  height: 0px;
  border-radius: 3rem;
  background: ${(props) => (props.img ? `url(${props.img})` : "#ddd")};
  background-size: cover;
  background-position: center;
`;

const Content = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
`;

const TextBubble = styled.div`
  display: inline-block;
  background: #ededed;
  margin-left: 13.33%;
  max-width: 61.9%;
  padding: 5.13%;
  border-radius: 0rem 2rem 2rem 2rem;
  cursor: pointer;

  span {
    font-size: 1.4rem;
    line-height: 1.29;
    color: #5f5f5f;
  }
`;

const EditArea = styled.div`
  display: inline-block;
  background: #ededed;
  margin-left: 13.33%;
  width: 61.9%;
  border-radius: 0rem 2rem 2rem 2rem;
  padding: 1%;

  textarea {
    width: 100%;
    padding: 4.13%;
    border-radius: 2rem;
    font-size: 1.4rem;
    line-height: 1.29;
    color: #5f5f5f;
    background: #e1e1e1;
    outline: none;
    border: none;
    resize: none;
  }
`;

const Time = styled.span`
  font-size: 1.2rem;
  color: #b3b3b3;
`;

const Replies = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: #3cd9d0;
  cursor: pointer;
`;

const EditOption = styled.div`
  margin-top: 0.5rem;
  margin-left: 17.33%;
  font-size: 1.2rem;
  color: #b3b3b3;

  span {
    cursor: pointer;
  }
`;

const EditBtn = styled.button`
  padding: 1% 3%;
  border-radius: 1rem;
  color: #5f5f5f;
`;

export default OneComment;
