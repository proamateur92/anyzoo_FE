import React from "react";
import Wrap from "../elements/Wrap";

// style
import styled from "styled-components";

// axios
// import instance from '../shared/axios';

// video player
import ReactPlayer from "react-player/lazy";

import { FiPlay, FiPause, FiRotateCw, FiFolderPlus, FiCamera, FiCrop } from "react-icons/fi";
import { RiDropFill } from "react-icons/ri";
import instance from "../shared/axios";

const ReelsWrite = (props) => {
  const textRef = React.useRef();
  const [video, setVideo] = React.useState(null);
  const [videoUrl, setVideoUrl] = React.useState(null);
  const [thumbIdx, setThumbIdx] = React.useState("00:00:01");
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [seeking, setSeeking] = React.useState(false);

  const videoRef = React.useRef();
  const [duration, setDuration] = React.useState(null);
  const [currentTime, setCurrentTime] = React.useState(0);

  const [startPoint, setStartPoint] = React.useState(0);
  const [endPoint, setEndPoint] = React.useState(15);

  const timeFormater = (source) => {
    const Totalseconds = Math.floor(source);
    const hour = Math.floor(Totalseconds / 3600)
      .toString()
      .padStart(2, "0");
    const minute = (Math.floor(Totalseconds / 60) - hour * 60).toString().padStart(2, "0");
    const second = (Totalseconds % 60).toString().padStart(2, "0");

    return hour > 0 ? `${hour}${minute}:${second}` : `${minute}:${second}`;
  };

  const addVideo = (e) => {
    const uploaded = e.target?.files[0];
    const typeValidity = uploaded.type.split("/")[0] === "video"
    const sizeValidity = uploaded.size

    if (typeValidity) {
      console.log("영상입니다!");
      setVideo(uploaded);
      setVideoUrl(URL.createObjectURL(uploaded));
    } else {
      window.alert("영상 파일만 업로드 가능합니다");
    }
  };

  const addReels = async () => {
    const formData = new FormData();
    formData.append("video", video);
    formData.append("thumbnail", thumbIdx);
    formData.append("startPoint", startPoint);
    formData.append("endPoint", endPoint);

    for (var key of formData.keys()) {
      console.log(key);
    }

    for (var value of formData.values()) {
      console.log(value);
    }

    // const videoData =  await instance.post('/api/upload', formData)
    // console.log(videoData)

    const reelsData = {
      content: textRef.current.value,
      video: "",
      img: "",
    };

    console.log(reelsData)
  };


  const onSeekAction = (e) => {
    console.log('seek', e)

  }

  const testerAct = (e) =>{
    e.stopPropagation()
    console.log('tester!')
    videoRef.current.seekTo(currentTime + 10)
  }

  const getDuration = (e) => {
    setDuration(e);

    if (e < 15) {
      setEndPoint(e);
    }
  };

  const getPlayedSeconds = (e) => {
  };

  // console.log(playPreview)

  return (
    <Wrap>
      <Header> 릴스 </Header>

      <Contents>
        <div>
          <p> 영상 올리기 </p>
          <input type="file" onChange={(e) => addVideo(e)} />
        </div>

        {video ? (
          <div>
            <p> 썸네일 지정 / 영상 자르기 (최대 15초) </p>
            <PlayerWrap onClick={() => setIsPlaying(!isPlaying)}>
              <ReactPlayer
                ref={videoRef}
                url={videoUrl}
                width={"100%"}
                height={"100%"}
                playing={isPlaying}
                muted={false}
                played={0}
                onDuration={(e) => getDuration(e)}
                onProgress={(e) => getPlayedSeconds(e)}
                controls={false}
                onSeek={(e) => onSeekAction(e)}
              />

              <VideoController>

                <ProgressWrap>

                <Progress type="range" min="0" max={duration} step={1}/>

                </ProgressWrap>


                <ProgressBar>
                  <ThumbIndicator onClick={(e)=>testerAct(e)}>
                    <div id="pointerwrap">
                      <RiDropFill id="pointer" />
                      <span> 썸네일 </span>
                    </div>
                  </ThumbIndicator>

                  {/* <Indicator id="start" position={startPoint} duration={duration}>ㅣ</Indicator>
                  <Indicator id="end" position={endPoint} duration={duration}>ㅣ</Indicator> */}
                </ProgressBar>


                
                <PlayStatus>
                  <div>
                    {isPlaying ? <FiPause className="playbtn" /> : <FiPlay className="playbtn" />}
                    <FiRotateCw className="playbtn" onClick={() => console.log('호이')}/>
                  </div>

                  <span> {timeFormater(currentTime)} / {timeFormater(duration)} </span>
                </PlayStatus>
              </VideoController>
            </PlayerWrap>
          </div>
        ) : null}

        <div>
          <p> 게시글 내용 </p>
          <textarea ref={textRef} />
        </div>
      </Contents>

      <Buttons>
        <button id="cancel"> 취소 </button>
        <button id="write" onClick={() => addReels()}> 작성하기 </button>
      </Buttons>
    </Wrap>
  );
};

export default ReelsWrite;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 7.5vh;
  color: #333;
  font-size: 1.8rem;
  font-weight: bold;
`;
const Contents = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  p {
    font-size: 1.6rem;
    color: #b3b3b3;
    margin: 0.5rem 0;
  }

  textarea {
    border: none;
    outline: none;
    resize: none;
    border-radius: 10px;
    background-color: #f8f8f8;
    width: 100%;
    height: 30vh;
    font-size: 1.4rem;
    padding: 1rem;
  }
`;

const Buttons = styled.div`
  width: 80%;
  margin: 10% auto;
  display: flex;
  justify-content: space-between;

  button {
    padding: 0;
    height: 6.25vh;
    width: 47.5%;
    border-radius: 1rem;
    font-size: 1.6rem;
  }

  #cancel {
    background: #F2F2F2;
    color: #aaa;
  }

  #write {
    background: #44DCD3;
    color: #333;
  }
`;

const PlayerWrap = styled.div`
  margin: auto;
  width: 100%;
  height: 80vh;
  border: 1px solid #ddd;
  background: #333;
  position: relative;
  display: flex;

  video {
    width: 100%;
  }
`;

const VideoController = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;

  background: linear-gradient(to top, #0000004d 70%, transparent);
  padding-top: 20%;
`;

const ProgressWrap = styled.div`


`

const ProgressBar = styled.div`
  width: 90%;
  margin: auto;
  height: 2rem;
  background: #ddd;
  border-radius: 2rem;
  position: relative;
`;

const PlayStatus = styled.div`
  width: 88%;
  margin: 1.5rem auto 2rem auto;
  color: #fff;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .playbtn {
    font-size: 2.4rem;
    margin-right: 1.5rem;
  }

  span {
    font-size: 1.4rem;
  }
`;

const Progress = styled.input`
  width: ${(props) => (props.currentTime / props.duration) * 100}%;
  height: 100%;
  top: 0;
  left: 0;
  background: #4addd0;
  border-radius: 2rem;
  position: absolute;

  display: flex;
  justify-content: flex-end;

  #progressEnd {
    width: 1%;
    height: 100%;
    position: relative;
  }
`;

const ThumbIndicator = styled.div`
  position: absolute;
  top: -4.5rem;
  left: 1rem;
  cursor: pointer;
  transform: translate(-50%, 0);

  #pointerwrap {
    position: relative;
  }

  #pointer {
    color: #4addd0;
    transform: rotate(180deg);
    font-size: 4.5rem;
  }

  span {
    position: absolute;
    left: 0;
    top: 35%;
    text-align: center;
    width: 100%;
  }
`;

const Indicator = styled.div`
  position: absolute;
  top: -0.4rem;
  height: 2.8rem;
  width: 0.8rem;
  border-radius: 1rem;
  background: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
  color: #aaa;
  left: ${(props) => (props.position / props.duration) * 100}%;
`;
