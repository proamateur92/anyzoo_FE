import React from "react";

// style
import styled from "styled-components";

// axios
import instance from "../shared/axios";

//element
import OneComment from "../elements/OneComment";
import SendBtn from "../elements/SendBtn";
import Drawers from "../elements/Drawers";

const ReComment = (props) => {
  const [replyList, setReplyList] = React.useState(null);
  const originalData = props.originalData;
  const commentId = props.originalData.id;
  const setOpenReplies = props.setOpenReplies;
  const setReplyLength = props.setReplyLength
  const commentRef = React.useRef();
  const [btnChange, setBtnChange] = React.useState(false);

  React.useEffect(() => {
    loadReplies()
  }, []);

  const loadReplies = () => {
    instance.get("/api/reply/" + commentId).then((res) => {
      setReplyList(res.data);
        if (res.data.length < 100) {
          setReplyLength(res.data.length);
        } else {
          setReplyLength('99+');
        }
    });
  }

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
      instance.post("/api/reply/" + commentId, { reply: commentRef.current.value })
      .then(() => loadReplies());
      commentRef.current.value = "";
      setBtnChange(false);
      setReplyLength((prev) => prev+1)
    } else {
      window.alert("댓글을 입력해주세요!");
    }
  };

  return (
    <Drawers setDrawerOn={setOpenReplies}>
      <ReplyWrap>
        <OriginalComment>
          <OneComment commentData={originalData} blockReply={true} />
        </OriginalComment>

        {replyList?.map((v) => (
          <OneComment key={v.id} commentData={v} isReply={true} />
        ))}
      </ReplyWrap>

      <InputWrapper>
        <CommentInput>
          <textarea ref={commentRef} onChange={inputChange} placeholder="메세지를 입력하세요" />
          {btnChange ? <SendBtn onClick={addComment} /> : <button onClick={addComment}>입력</button>}
        </CommentInput>
      </InputWrapper>
    </Drawers>
  );
};

export default ReComment;

const OriginalComment = styled.div`
  border-bottom: 1px solid #d1d1d6;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
`;

const ReplyWrap = styled.div`
  width: 90%;
  height: 80%;
  margin: 2.5rem;
  overflow: scroll;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const CommentInput = styled.div`
  display: flex;
  height: 4rem;
  width: 88%;
  margin: 1rem 0rem 1.5rem 0rem;
  position: fixed;
  bottom: 12vh;

  textarea {
    width: 100%;
    font-size: 1.4rem;
    padding: 1.1rem 1.5rem;
    border-radius: 2rem;
    border: none;
    outline: none;
    resize: none;
    background-color: #ebebeb;
    color: #5e5e5e;

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
