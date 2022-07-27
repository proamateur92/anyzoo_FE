import React from "react";

// style
import styled from "styled-components";

import instance from "../shared/axios";

//element
import OneComment from "../elements/OneComment";
import SendBtn from "../elements/SendBtn";

const ReComment = (props) => {
  const replyList = props.replyList.data;
  const commentId = props.commentId;
  const commentRef = React.useRef();
  const [btnChange, setBtnChange] = React.useState(false);

  const inputChange = () => {
    if (commentRef.current.value === "") {
      setBtnChange(false);
    } else {
      setBtnChange(true);
    }
  };

  // 코멘트 추가하기
  const addComment = async () => {
    if (commentRef.current.value) {
      instance.post("/api/reply/" + commentId, { reply: commentRef.current.value });
      commentRef.current.value = "";
      setBtnChange(false);
    } else {
      window.alert("댓글을 입력해주세요!");
    }
  };

  return (
      <ReplyWrap>
        
          {replyList?.map((v) => (
            <OneComment key={v.id} commentData={v} isReply={true} />
          ))}
        <InputWrapper>
          <CommentInput>
            <textarea ref={commentRef} onChange={inputChange} placeholder="메세지를 입력하세요" />
            {btnChange ? <SendBtn onClick={addComment} /> : <button onClick={addComment}>입력</button>}
          </CommentInput>
        </InputWrapper>
      </ReplyWrap>
  );
};

export default ReComment;

const ReplyWrap = styled.div`
  width: 100%;
  max-width: 599px;
`;

const InputWrapper = styled.div`
  width: 100%;
  max-width: 599px;
  height: 8rem;
  padding: 0 3rem;
  background: #ffffffb3;

  .fix {
    position: fixed;
    bottom: 10vh;
  }
`;

const CommentInput = styled.div`
  display: flex;
  height: 4rem;
  margin: 2.2rem 0rem;
  position: relative;

  textarea {
    width: 100%;
    font-size: 1.4rem;
    padding: 1.1rem 1.5rem;
    border-radius: 2rem;
    border: none;
    outline: none;
    resize: none;
    background-color: #ebebeb;
    color: #b3b3b3;

    &::placeholder {
      color: #b3b3b3;
      font-weight: 600;
    }
  }

  button {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    padding: none;
    width: 20%;
    background-color: #ebebeb;
    border-left: 1px solid #b3b3b3;
    border-radius: 0rem 2rem 2rem 0rem;
    color: #b3b3b3;
  }
`;
