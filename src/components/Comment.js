// react
import React from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';

// commentSlice
import { loadCommentsDB, addCommentDB} from '../redux/modules/commentSlice';

// style
import styled from 'styled-components';

//element
import OneComment from '../elements/OneComment';

const Comment = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.info)
  const postId = props.postId;
  const commentRef = React.useRef();

  // 코멘트 불러오기
  React.useEffect(() => {
    dispatch(loadCommentsDB({ postId: postId, pgNo: 0 }));
  }, [dispatch, postId]);

  const comments = useSelector((state) => state.comment.list);

  // 코멘트 추가하기
  const addComment = async () => {
    const commentData = {
      postId: postId,
      userUserImage: {url: user.img},
      userNickname: user.nickname,
      comment: commentRef.current.value,
    }; 

    await dispatch(addCommentDB(commentData));
    commentRef.current.value = '';
  };

  // 코멘트 수정하기

  return (
    <CommentsWrap>
      {comments?.length > 0 ? (
        comments.map((v) => (
          <OneComment key={v.id} commentData={v} postId={postId} />
        ))
      ) : (
        <NoComments> 아직 댓글이 없어요 </NoComments>
      )}

      <CommentInput>
        <textarea ref={commentRef} placeholder='메세지를 입력하세요'/>
        <button onClick={addComment}>입력</button>
      </CommentInput>
    </CommentsWrap>
  );
};

export default Comment;

const CommentsWrap = styled.div`
  width: 100%;
  margin: auto;
  padding: 2rem 3rem;
  display:flex;
  flex-direction: column;

  border: 1px solid #eee;
`;

const NoComments = styled.p`
  text-align: center;
  color: #aaa;
  font-size: 1.4rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CommentInput = styled.div`
  display: flex;
  height: 4rem;
  margin: 2.2rem 0rem;

  textarea {
    width: 80%;
    font-size: 1.4rem;
    padding: 1.1rem 1.5rem;
    border-radius: 2rem 0rem 0rem 2rem;
    border: none;
    outline: none;
    resize: none;
    background-color: #ebebeb;
    color: #b3b3b3;

    &::placeholder {
      color:#b3b3b3;
      font-weight: 600;
    }
  }

  button {
    padding: none;
    width: 20%;
    background-color: #ebebeb;
    border-left: 1px solid #b3b3b3;
    border-radius: 0rem 2rem 2rem 0rem;
    color: #b3b3b3;
  }
`;
