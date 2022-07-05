import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { loadCommentsDB } from "../redux/modules/commentSlice";

import styled from "styled-components";

const Comment = (props) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comment.list);
  const postId = props.postId;

  console.log(comments);

  React.useEffect(() => {
    dispatch(loadCommentsDB(postId));
  }, []);

  return (
    <CommentsWrap>
      <p> 댓글이 아직 없어요 </p>

      {comments.map((v, i) => (
        <OneComment>
          <h5> {v.username} </h5>
          <p> {v.content}  </p>
          <sub> 2022-07-05 </sub>
          <span> 삭제 </span>
          <span> 수정 </span>
        </OneComment>
      ))}

      <CommentInput>
        <textarea />
        <button>전송</button>
      </CommentInput>
    </CommentsWrap>
  );
};

export default Comment;

const CommentsWrap = styled.div`
  width: 95%;
  margin: auto;
`;

const OneComment = styled.div`
  display: flex;
  gap: 20px;

  border: 1px solid #ddd;

  h5 {
    font-weight: bold;
  }
`;

const CommentInput = styled.div`
  display: flex;

  textarea {
    width: 80%;
    border: 1px solid #ddd;
  }

  button {
    width: 20%;
  }
`;
