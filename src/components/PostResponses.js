import React from "react";

// style
import styled from "styled-components";

// axios
import instance from "../shared/axios";

//icon
import { IoHeartOutline, IoHeart, IoChatbubbleOutline } from "react-icons/io5";

// router
import { useNavigate } from "react-router-dom";


const PostResponses = (props) => {
  const navigate = useNavigate();
  const boardMainId = props.boardMainId
  const likeCnt = props.likeCnt
  const pagetitle = props.pagetitle
  const [commentCount, setCommentCount] = React.useState(null);
  const [isLiked, setIsLiked] = React.useState(false);
  const [likefluc, setLikefluc] = React.useState(0);

  
  const likePost = () => {
    instance.post('/api/heart/' + boardMainId)
    .then(() => {
      setIsLiked(!isLiked)

      if (isLiked) {
        setLikefluc((prev) => prev + 1) 
      } else if (likefluc > 0) {
        setLikefluc((prev) => prev - 1)
      }
    })
    .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    instance
      .get("/api/comment/count/" + boardMainId)
      .then((res) => setCommentCount(res.data))
      .catch((err) => console.log(err));

    instance
      .get("/api/heart/" + boardMainId)
      .then((res) => setIsLiked(res.data))
      .catch((err) => console.log(err));
  }, [boardMainId, isLiked]);

  return(
    <Reactions>
      <span className="icon" onClick={() => likePost()}>
        {isLiked ? <IoHeartOutline /> : <IoHeart className="filled" />}
        {(likeCnt + likefluc).toLocaleString()}
      </span>
 
      <span className="icon">
        <IoChatbubbleOutline onClick={() => navigate(pagetitle+boardMainId)}/> {commentCount ? commentCount.toLocaleString() : 0}
      </span>
  </Reactions>
  )
}

export default PostResponses

const Reactions = styled.div`
  display: flex;
  align-items: center;
  height: 4.3rem;
  padding: 0px 10%;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  color: #b3b3b3;
  font-size: 1.5rem;

  span {
    margin-right: 1.1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .icon {
    cursor: pointer;
  }

  .filled {
    color: red;
  }
`;
