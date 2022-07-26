import React from "react";

import Wrap from "../elements/Wrap";

// style
import styled from "styled-components";
import instance from "../shared/axios";

// video player
import ReactPlayer from "react-player/lazy";

// icons
import { IoHeartOutline, IoHeart, IoChatbubbleOutline } from "react-icons/io5";
import { FiAlignJustify } from "react-icons/fi";

const Reels = (props) => {
  const [reelsData, setReelsData] = React.useState();

  console.log(reelsData)

  React.useEffect(() => {
    instance.get("/api/reels/category/all?page=0").then((res) => setReelsData(res.data.content[0]));
  }, []);

  const [commentCount, setCommentCount] = React.useState(null);
  const [isLiked, setIsLiked] = React.useState(false);
  const [likefluc, setLikefluc] = React.useState(0);

  const likePost = () => {
    instance
      .post("/api/heart/" + reelsData?.boardMainId)
      .then(() => {
        setIsLiked(!isLiked);
        isLiked ? setLikefluc((prev) => prev + 1) : setLikefluc((prev) => prev - 1);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    if (reelsData) {
      instance
        .get("/api/comment/count/" + reelsData?.boardMainId)
        .then((res) => setCommentCount(res.data))
        .catch((err) => console.log(err));

      instance
        .get("/api/heart/" + reelsData?.boardMainId)
        .then((res) => setIsLiked(res.data))
        .catch((err) => console.log(err));
    }
  }, [reelsData, isLiked]);

  return (
    <Wrap>
      <Cover>
        <InfoBox>
          <UserInfo>
            <UserProfile img={reelsData?.userProfileImg} />
            <p>{reelsData?.nickname}</p>
          </UserInfo>
          <Texts> {reelsData?.contents} </Texts>

          <More>
            <Reactions>
              <span className="like" onClick={() => likePost()}>
                {isLiked ? <IoHeartOutline /> : <IoHeart className="filled" />}
                {reelsData?.likeCnt + likefluc}
              </span>

              <span>
                <IoChatbubbleOutline /> {commentCount ? commentCount : 0}
              </span>
            </Reactions>

            <FiAlignJustify id="seeMore" />
          </More>
        </InfoBox>
      </Cover>
      <VideoClip>
        {/* <Preview img={reelsData?.thumbnail}/> */}
        <ReactPlayer 
          width={"100%"} 
          height={"100%"} 
          url={reelsData?.video}
          playing={true}
          muted={false}
          />
      </VideoClip>
    </Wrap>
  );
};

export default Reels;

const Cover = styled.div`
  width: 100%;
  min-height: 92vh;
  margin-bottom: -2.3vh;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  overflow: hidden;
  position: relative;
`;

const InfoBox = styled.div`
  position: absolute;
  width: 100%;
  bottom: 2.3%;
  left: 0;
  padding: 8%;
`;

const UserInfo = styled.span`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  width: 95%;
  flex-shrink: 0;

  p {
    color: #fff;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
  }
`;

const UserProfile = styled.span`
  width: 3rem;
  padding-top: 3rem;
  border-radius: 100px;
  margin-right: 1rem;
  background: ${(props) => (props.img ? `url(${props.img})` : "#ddd")};
  background-size: cover;
  background-position: center;
`;

const Texts = styled.p`
  width: 72.7%;
  font-size: 1.2rem;
  color: #fff;
  margin-bottom: 1.8rem;

  text-overflow: ellipsis;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const More = styled.div`
  display: flex;
  justify-content: space-between;
  color: #fff;

  #seeMore {
    font-size: 2.4rem;
  }
`;

const Reactions = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;

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

const Preview = styled.div`
  width: 100%;
  height: 100%;
  background: url(${props => props.img});
  background-position: center;
  background-size:cover;
`

const VideoClip = styled.div`
  position: absolute;
  z-index:-1;
  top: 0;
  width: 100%;
  max-width: 599px;
  height: 100%;
`;
