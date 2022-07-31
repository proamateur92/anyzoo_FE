// react
import React, {useCallback} from "react";

// redux
import { useSelector, useDispatch } from "react-redux";

// commentSlice
import { loadCommentsDB, addCommentDB } from "../redux/modules/commentSlice";

// style
import styled from "styled-components";

//element
import OneComment from "../elements/OneComment";
import SendBtn from "../elements/SendBtn";


const Comment = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.info);
  const postId = props.postId;
  const commentRef = React.useRef();
  const [btnChange, setBtnChange] = React.useState(false)
  const blockReply = props.blockReply
  const overflow = props.overflow

  const isLast = useSelector((state) => state.comment.isLast);
  const topRef = React.useRef();
  const bottomRef = React.useRef();
  const [page, setPage] = React.useState(0);

  

    // 코멘트 불러오기
    React.useEffect(() => {
      if (page >= 0) {
        dispatch(loadCommentsDB({ postId: postId, pgNo: page }));
      } 
    }, [dispatch, postId, page, isLast]);
  
    const comments = useSelector((state) => state.comment.list);


  // 페이지인덱스넘버 바꾸기
  const loadinghandler = useCallback(
    (entries) => {
      if (entries[0].isIntersecting && !isLast) {
        setPage((page) => page + 1);
      }
    },
    [isLast]
  );
 
  // 리스트 끝 감지
  React.useEffect(() => {
    const observer = new IntersectionObserver(loadinghandler, { threshold: 0.5 });
    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [loadinghandler]);



  // 버튼 모양 바꿔주기
  const inputChange = () => {
    if (commentRef.current.value === '') {
      setBtnChange(false)
    } else {
      setBtnChange(true)
    }
  }

  // 코멘트 추가하기
  const addComment = async () => {
    if (commentRef.current.value) {
      const commentData = {
        postId: postId,
        userUserImage: { url: user.img },
        userNickname: user.nickname,
        comment: commentRef.current.value,
      };

      await dispatch(addCommentDB(commentData));
      commentRef.current.value = "";
      setBtnChange(false)
      dispatch(loadCommentsDB({ postId: postId, pgNo: 0 }));
      topRef.current.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.alert('댓글을 입력해주세요!')
    }
  };

  return (
    <CommentsWrap overflow={overflow}>
      <div ref={topRef}/>

      <InnerWrap>
              {comments?.length > 0 ? (
        comments.map((v) => <OneComment key={v.id} commentData={v} postId={postId} blockReply={blockReply}/>)
      ) : (
        <NoComments> 아직 댓글이 없어요 </NoComments>
      )}
      </InnerWrap>

      <InputWrapper>
        <CommentInput>
          <textarea ref={commentRef} onChange={inputChange} placeholder="메세지를 입력하세요" />
          {
          btnChange ? 
          <SendBtn onClick={addComment} /> :
          <button onClick={addComment}>입력</button>
        }
        </CommentInput>
      </InputWrapper>
      <div ref={bottomRef}/>
    </CommentsWrap>
  );
};

export default Comment;

const CommentsWrap = styled.div`
  width: 100%;
  margin: auto;
  padding: 2rem 0 14vh;
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
  height: 100%;
  overflow: ${(props) => props.overflow === 'overflowScroll' ?  'scroll' : 'hidden'};
`;

const InnerWrap = styled.div`
  padding: 0 3rem;
`

const NoComments = styled.p`
  text-align: center;
  color: #aaa;
  font-size: 1.4rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputWrapper = styled.div`
  width: 100%;
  max-width: 599px;
  height: 8rem;
  padding: 0 3rem;
  background: #ffffffb3;
  position:fixed;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 10vh;
`

const CommentInput = styled.div`
  display: flex;
  height: 4rem;
  margin: 2.2rem 0rem;
  position: relative;
  background-color: #ebebeb;
  border-radius: 2rem;

  textarea {
    width: 85%;
    font-size: 1.4rem;
    padding: 1.1rem 1.5rem;
    line-height: 1.8rem;
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

