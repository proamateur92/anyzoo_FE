// react
import React from "react";

// router
import { useNavigate } from "react-router-dom";

// component
import EditBubble from "../elements/EditBubble";
import PhotoSlide from "./PhotoSlide";

// style
import styled from "styled-components";

// icon
import { IoMdMore } from "react-icons/io";
import { IoHeartOutline, IoHeart, IoChatbubbleOutline } from "react-icons/io5";

// axios
import instance from "../shared/axios";

const PostCard = (props) => {
  const navigate = useNavigate();
  const postData = props.data;
  const boardMainId = props.data.boardMainId;
  const [bubbleOn, setBubbleOn] = React.useState(false);
  const [commentCount, setCommentCount] = React.useState(null);
  const [isLiked, setIsLiked] = React.useState(false);
  const [likefluc, setLikefluc] = React.useState(0);

  const cardWrapRef = React.useRef();
  const [cardWidth, setCardWidth] = React.useState(null);

  const likePost = () => {
    instance.post('/api/heart/' + boardMainId)
    .then(() => {
      setIsLiked(!isLiked)
      isLiked ? setLikefluc((prev) => prev + 1) : setLikefluc((prev) => prev - 1)
    })
    .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    setCardWidth(cardWrapRef?.current?.offsetWidth);
  }, [cardWrapRef?.current?.offsetWidth]);

  const menuOpen = () => {
    setBubbleOn(!bubbleOn);
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

  return (
    <OuterWrap>
      <CardWrap ref={cardWrapRef} cardWidth={cardWidth}>
        <CardHeader>
          <UserInfo>
            <UserProfile img={postData.userProfileImg} cardWidth={cardWidth} />
            <p>
              <span className="grade"> Purple </span>
              {postData.nickname}
            </p>
          </UserInfo>

          <IoMdMore id="optionMenu" onClick={menuOpen} />
          {bubbleOn ? <EditBubble contentsId={boardMainId} setBubbleOn={setBubbleOn} /> : null}
        </CardHeader>

        <Contents>
          <ImgPreview>
            <PhotoSlide photos={postData.img} clickAction={() => navigate("/post/detail/" + boardMainId)} />
          </ImgPreview>
          <TextPreview onClick={() => navigate("/post/detail/" + boardMainId)}>
            <span>{postData.contents}</span>
          </TextPreview>
        </Contents>

        <Reactions>
          <span className="like" onClick={() => likePost()}>
            {isLiked ? <IoHeartOutline /> : <IoHeart className="filled" />}
            {postData.likeCnt + likefluc}
          </span>

          <span>
            <IoChatbubbleOutline /> {commentCount}
          </span>
        </Reactions>
      </CardWrap>
    </OuterWrap>
  );
};

export default PostCard;

const OuterWrap = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding-top: 84%;
  position: relative;
`;

const CardWrap = styled.div`
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  margin: auto;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  position: absolute;
`;

const CardHeader = styled.div`
  width: 80%;
  height: 19%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.6rem;
  position: relative;

  #optionMenu {
    color: #919191;
    font-size: 2.2rem;
    cursor: pointer;
  }
`;

const UserInfo = styled.span`
  display: flex;
  align-items: center;
  margin: 0px;
  width: 100%;
  flex-shrink: 0;

  p {
    color: #333;
    font-size: 1.6rem;
    display: flex;
    align-items: center;
  }

  .grade {
    background: #6946b2;
    color: white;
    font-size: 0.9rem;
    font-weight: 100;
    padding: 0.29rem 0.8rem 0.41rem 0.9rem;
    border-radius: 3rem;
    margin-right: 0.6rem;
  }
`;

const UserProfile = styled.span`
  width: 10%;
  padding-top: 10%;
  border-radius: 100px;
  margin-right: 1.2rem;
  background: url(${(props) =>
    props.img
      ? props.img
      : "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FopbGC%2FbtrF9ZNhpja%2FY026LUE8lwKcGmfqJiO3SK%2Fimg.png"});
  background-size: cover;
  background-position: center;
`;

const Contents = styled.div`
  cursor: pointer;
  margin: auto;
  width: 80%;
  height: 68.25%;
`;

const ImgPreview = styled.div`
  width: 100%;
  height: 79.07%;
  border-radius: 2rem;
  margin: auto;

  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  border: 1px solid #eee;
  overflow: hidden;
`;

const TextPreview = styled.p`
  height: 20.93%;
  width: 72.33%;
  display: flex;
  align-items: center;
  overflow: hidden;
  font-size: 1.4rem;
  color: #666;

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Reactions = styled.div`
  display: flex;
  align-items: center;
  height: 12.7%;
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

  .like {
    cursor: pointer;
  }

  .filled {
    color: red;
  }
`;
