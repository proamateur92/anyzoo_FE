import React from "react";

import Wrap from "../elements/Wrap";

// style
import styled from "styled-components";

// axios
import instance from "../shared/axios";

// video player
import ReactPlayer from "react-player/lazy";

// icons
import { IoHeartOutline, IoHeart, IoChatbubbleOutline } from "react-icons/io5";
import { FiAlignJustify,FiVolume2, FiVolumeX } from "react-icons/fi";

// element
import EditBubble from "../elements/EditBubble";
import Drawers from "../elements/Drawers";
import Comment from "../components/Comment";
import SwipeGuide from "../elements/SwipeGuide";

// router
import { useParams } from "react-router-dom";

const Reels = () => {
  const params = useParams();
  const [reelsData, setReelsData] = React.useState();
  const [isPlaying, setIsPlaying] = React.useState();
  const [startX, setStartX] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [isLast, setIsLast] = React.useState(false);
  const [showCover, setShowCover] = React.useState(true);
  const coverRef = React.useRef();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isDetail, setIsDetail] = React.useState(params.id);
  const [drawerOn, setDrawerOn] = React.useState(false);
  const [soundOn, setSoundOn] = React.useState(true);


  // 스크롤 금지!
  React.useEffect(() => {
    document.body.style.overflow = "hidden";

    const clearScrollBlock = () => {
      document.body.style.overflow = "unset";
    }

    return clearScrollBlock()
  }, []);


  // 영상 불러오기
  const loadReels = () => {
    if (isDetail) {
      instance.get("/api/reels/" + params.id)
      .then((res) => { 
        setReelsData(res.data);
        setIsDetail(false)
      });
    } else {
      instance.get("/api/reels/category/all?page=" + page).then((res) => {
        setIsLast(() => res.data.last);
        setReelsData(res.data.content[0]);
        window.history.pushState('', '', `/reels/${res.data.content[0].boardMainId}`)
      });
    }
  }

  // 재생 타이머 걸기
  React.useEffect(() => {
    setIsPlaying(false);
    setShowCover(true);
    loadReels()

    const coverControl = setTimeout(() => {
      setIsPlaying(true);
      setShowCover(false);
    }, 500);

    return () => clearTimeout(coverControl);
  }, [page, params.id]);

  // 재생 바 컨트롤
  const [duration, setDuration] = React.useState(null);
  const [currentTime, setCurrentTime] = React.useState(0);


  // 영상 재생/멈추기 
  const playVideo = () => {
    setIsPlaying(!isPlaying);
    setShowCover(false);
  };


  // 릴스 넘기기
  const moveSlide = (target, endX) => {
    const distance = Math.abs(startX - endX);

    if (distance > 30 && startX !== 0 && endX !== 0) {
      startX - endX > 0 ? showNext() : showPrev();
    } else if (distance < 30 && startX !== 0 && endX !== 0) {
      if (target === coverRef.current) {
        setShowCover(false);
        playVideo();
      }
    }
  };

  const showNext = () => {
    isLast ? console.log("마지막페이지에요") : setPage(() => page + 1);
  };

  const showPrev = () => {
    page > 0 ? setPage(() => page - 1) : setPage(() => 0);
  };

  // 반응(좋아요, 댓글) 컨트롤
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

  // 릴스 반응 불러오기
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
      <SwipeGuide/>
      <Cover
        ref={coverRef}
        onMouseDown={(e) => setStartX(e.clientX)}
        onMouseUp={(e) => moveSlide(e.target, e.clientX)}
        onTouchStart={(e) => setStartX(e.touches[0].clientX)}
        onTouchEnd={(e) => moveSlide(e.target, e.changedTouches[0].clientX)}
      >
        

        <InfoBox>
          <UserInfo>
            <UserProfile img={reelsData?.userProfileImg} />
            <p>{reelsData?.nickname}</p>
          </UserInfo>
          <Texts> {reelsData?.contents} </Texts>

          <More>
            <Reactions>
              <span className="icons" onClick={() => likePost()}>
                {isLiked ? <IoHeartOutline /> : <IoHeart className="filled" />}
                {reelsData?.likeCnt + likefluc}
              </span>

              <span className="icons" onClick={()=> setDrawerOn(true)}>
                <IoChatbubbleOutline /> {commentCount ? commentCount : 0}
              </span>

              <span className="icons" onClick={()=> setSoundOn(!soundOn)}>  
                { soundOn ? <FiVolume2/> : <FiVolumeX/> }
              </span>

              { drawerOn ?
                <Drawers setDrawerOn={setDrawerOn}>
                  <CommentWrap>
                    <OriginalContent>
                      <div id="userinfo">
                        <UserProfile img={reelsData?.userProfileImg} />
                        <span>{reelsData?.nickname}</span>
                      </div>
                      <p>{reelsData?.contents}</p>

                    </OriginalContent>
                    <Comment postId={ reelsData?.boardMainId } blockReply={true} overflow={'overflowScroll'}/>
                  </CommentWrap>
                </Drawers>
              : null
              }
            </Reactions>

            {menuOpen ? 
              <EditBubble data={reelsData} setBubbleOn={setMenuOpen} targetNickname={reelsData?.nickname} direction={'bottom'}/> 
            : null}
            <FiAlignJustify id="seeMore" onClick={() => setMenuOpen(!menuOpen)} />
          </More>
        </InfoBox>
      </Cover>

      <PlayBar currentTime={currentTime} duration={duration}/>
      <VideoClip>
        {showCover ? <Preview img={reelsData?.thumbnail} /> : null}
        <ReactPlayer
          width={"100%"}
          height={"100%"}
          url={reelsData?.video}
          playing={isPlaying}
          muted={!soundOn}
          onDuration={(e) => setDuration(e)}
          onProgress={(e) => setCurrentTime(e.playedSeconds)}
          id="player"
        />
      </VideoClip>
    </Wrap>
  );
};

export default Reels;

const Cover = styled.div`
  width: 100%;
  height: 100%;
  min-height: 92vh;
  margin-bottom: -2.3vh;
  background: linear-gradient(to top, #0000004d 10%, transparent);
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
  border: 1px solid #eee;
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
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 3;
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

  .icons {
    cursor: pointer;
  }

  .filled {
    color: red;
  }
`;

const VideoClip = styled.div`
  position: absolute;
  background: #333;
  z-index: -1;
  top: -4.2rem;
  width: 100%;
  min-width: 100%;
  height: 100%;
  min-height: 92vh;
  max-width: 599px;
  overflow: hidden;
`;

const PlayBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 0.4rem;
  width: ${props => (props?.currentTime / props?.duration)*100}%;
  background: #666;
`

const Preview = styled.div`
  width: 100%;
  min-width: 100%;
  height: 100%;
  min-height: 92vh;
  background: url(${(props) => props.img}) no-repeat;
  background-position: center;
  background-size: contain;
`;

const CommentWrap = styled.div`
  margin-top: 2.5rem;
`

const OriginalContent =styled.div`
  width: 85%;
  margin: auto;
  color: #333;
  
  span {
    font-size: 1.4rem;
    font-weight: 600;
    color: #333;
    display: flex;
    align-items: center;
  }

  p{
    font-size: 1.4rem;
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  #userinfo{
    display: flex;
    margin-bottom: 1rem;
  }
`