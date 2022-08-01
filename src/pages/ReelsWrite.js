import React from "react";
import Wrap from "../elements/Wrap";

// style
import styled from "styled-components";

// axios
import instance from '../shared/axios';

// router
import { useNavigate, useParams } from 'react-router-dom';

// video player
import ReactPlayer from "react-player/lazy";

// element
import LoadingSpinner from "../elements/LoadingSpinner";

// icons
import { FiPlay, FiPause, FiFolderPlus} from "react-icons/fi";
import { RiDropFill } from "react-icons/ri";

const ReelsWrite = () => {
  const params = useParams()
  const navigate = useNavigate()
  const textRef = React.useRef();
  const [video, setVideo] = React.useState(null);
  const [videoUrl, setVideoUrl] = React.useState(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const videoRef = React.useRef();
  const trackRef = React.useRef();
  const [duration, setDuration] = React.useState(null);
  const [stopper, setStopper] = React.useState(null);
  const [currentTime, setCurrentTime] = React.useState(0);

  const startPtRef = React.useRef();
  const endPtRef = React.useRef();
  const [startPoint, setStartPoint] = React.useState(0);
  const [endPoint, setEndPoint] = React.useState(15);
  const [spinnerOn, setSpinnerOn] = React.useState(null);

  // 새로 작성인지, 수정인지 판별
  const isNew = params.id === 'new' ? true : false

  // 수정이라면 : 현재 릴스의 데이터를 불러와 state로 저장
  const [thisPost, setThisPost] = React.useState(null)

  React.useEffect(()=>{
    if (!isNew){
    instance.get('/api/reels/'+params.id).then((res)=> setThisPost(res.data))
  }
  },[params, isNew])

  // 시간 00초 -> 00:00 으로 맞추기
  const timeFormater = (source, getfull) => {
    const Totalseconds = Math.floor(source);
    const hour = Math.floor(Totalseconds / 3600)
      .toString()
      .padStart(2, "0");
    const minute = (Math.floor(Totalseconds / 60) - hour * 60).toString().padStart(2, "0");
    const second = (Totalseconds % 60).toString().padStart(2, "0");

    if (getfull || hour > 0) {
      return `${hour}:${minute}:${second}`;
    } else {
      return `${minute}:${second}`;
    }
  };

  const addVideo = (e) => {
    const uploaded = e.target?.files[0];
    const allowedfile = ['mp4', 'avi', '.mov']
    const typeValidity = allowedfile.includes(uploaded?.type?.split("/")[1]) ;
    const sizeValidity = uploaded?.size < (100*1024*1024);
    const textValidity = textRef.current.value !== ''

    if (typeValidity && sizeValidity && textValidity) {
      setVideo(uploaded);
      setVideoUrl(URL.createObjectURL(uploaded));
    } else if (!typeValidity) {
      window.alert(allowedfile.join(', ')+" 파일만 업로드 가능합니다");
    } else if (!sizeValidity) {
      window.alert("100MB 이하의 파일로 올려주세요");
    } else if (!textValidity) {
      window.alert("내용을 입력해주세요!")
    }
  };

  const addReels = async () => {
    setSpinnerOn(()=>true)
    const formData = new FormData();
    formData.append("video", video);
    formData.append("thumbnailTime", timeFormater(currentTime, true));
    formData.append("startPoint", timeFormater(startPoint, true));

    const videoData = 
      await instance.post("/api/upload", formData)
      .catch((err)=> {
        // window.alert('문제가 발생하였습니다')
        window.alert(err)
        setSpinnerOn(()=>false)
        console.log(err);        
      });

    const reelsData = {
      content: textRef.current.value,
      video: videoData.data.video,
      titleImg: videoData.data.thumbnail,
      categoryName: "cute",
    };

    await instance.post("/api/reels/", reelsData).then((res) => {
      if (res.status === 200) {
        window.alert('업로드 성공!')
        setSpinnerOn(()=>false)
        navigate('/reels')
      }})
      .catch((err) => {
        window.alert(err)
        // window.alert('문제가 발생하였습니다')
        setSpinnerOn(()=>false)
        console.log(err);
      });
  };

  const editReels = () =>{
    const newData = {
      contents: textRef.current.value,
      categoryName: 'cute'
    }
    instance.patch('/api/reels/' + params.id, newData).then((res) => {
      if (res.status === 200) {
        window.alert('수정 성공!')
        navigate('/reels/'+res.data.data.boardMainId)
      } else {
        window.alert('문제가 발생하였습니다')
      }
    }).catch((err) => console.log(err));
  }

  const getDuration = (e) => {
    setDuration(Math.floor(e));
    setStopper(e);
    if (e < 15) {
      setEndPoint(e);
    }
  };

  const getPlayedSeconds = (e) => {
    const now = Math.floor(e.playedSeconds);
    trackRef.current.value = now;
    setCurrentTime(() => now);

    if (e.playedSeconds >= stopper) {
      setIsPlaying(false);
      setStopper(duration);
    }
  };

  const changeCurrentTime = (e) => {
    videoRef.current.seekTo(e.target.value);
    setCurrentTime(Math.floor(e.target.value));
  };

  const changeStartPt = (e) => {
    const pointer = parseInt(e.target.value)
    setStartPoint(pointer);
    if (duration > pointer + 15) {
      endPtRef.current.value = pointer+15
      setEndPoint(pointer+15);
    } else {
      endPtRef.current.value = duration
      setEndPoint(duration);
    }
  };

  const testPlay = () => {
    trackRef.current.value = startPoint;
    videoRef.current.seekTo(startPoint);
    setStopper(endPoint);
    setIsPlaying(true);
    console.log(endPoint)
  };

  return (
    <Wrap>
      {spinnerOn ? <LoadingSpinner/> : null} 
      <Header> 릴스 </Header>

      <Contents>
        {
        isNew ?
        <div>
          <p> 영상 올리기 </p>
          <LabelIcon htmlFor="videoinput"> <FiFolderPlus/> </LabelIcon>
          <input id='videoinput' type="file" capture="camera" accept="video/*" onChange={(e) => addVideo(e)} />
        </div>
        :null
        }

        {
        video ? (
          <div>
            <p> 영상 미리보기 </p>
            <span id="uploadInfo"> (4초 이상, 용량 100Mb 이하 mp4 / avi 파일 )</span>
            <PlayerWrap>
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
              />

              <VideoController>
                <ProgressWrap>
                  <CropBar>
                    <StartPt
                      ref={startPtRef}
                      type="range"
                      min="0"
                      max={duration}
                      step={1}
                      defaultValue={startPoint}
                      duration={duration}
                      onChange={(e) => changeStartPt(e)}
                    />
                    <EndPt
                      ref={endPtRef}
                      type="range"
                      min="0"
                      max={duration}
                      step={1}
                      defaultValue={endPoint}
                      duration={duration}
                    />
                  </CropBar>
                  <div className="guidetrack">
                    <ThumbIndicator position={currentTime} duration={duration}>
                      <div id="pointerwrap">
                        <RiDropFill id="pointer" />
                        <span> Thumb </span>
                      </div>
                    </ThumbIndicator>
                  </div>

                  <ProgressBar
                    ref={trackRef}
                    type="range"
                    min="0"
                    max={duration}
                    step={1}
                    onChange={(e) => changeCurrentTime(e)}
                    defaultValue={0}
                  />
                </ProgressWrap>

                <PlayStatus>
                  <div>
                    {isPlaying ? (
                      <FiPause onClick={() => setIsPlaying(!isPlaying)} className="playbtn" />
                    ) : (
                      <FiPlay onClick={() => setIsPlaying(!isPlaying)} className="playbtn" />
                    )}
                    <span onClick={() => testPlay(!isPlaying)} id='testplay'>미리보기</span>
                  </div>
                  
                  <span>
                    {timeFormater(currentTime)} / {timeFormater(duration)}
                  </span>
                </PlayStatus>
              </VideoController>
            </PlayerWrap>
          </div>
        ) : null}

        <div>
          <p> 게시글 내용 </p>
          <textarea ref={textRef} defaultValue={isNew ? '' : thisPost?.contents} />
        </div>
      </Contents>

      <Buttons>
        <button id="cancel" onClick={() => navigate(-1)}> 취소 </button>
        {
          isNew ? 
          <button id="write" onClick={() => addReels()}> 작성하기 </button>
          : <button id="write" onClick={() => editReels()}> 수정하기 </button>
        }
        
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

  #uploadInfo {
    color: #b3b3b3;
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

  #videoinput{
    display:none;
  }
`;

const LabelIcon = styled.label`
  background: #e4e4e4;
  width: 6rem;
  height: 6rem;
  border-radius: 1rem;
  margin: 1rem 1rem 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color:#333;
  font-size: 1.8rem;
  cursor: pointer;
`

const Buttons = styled.div`
  width: 80%;
  margin: 10% auto;
  display: flex;
  justify-content: space-between;

  button {
    padding: 0;
    height: 5rem;
    width: 47.5%;
    border-radius: 1rem;
    font-size: 1.6rem;
  }

  #cancel {
    background: #f2f2f2;
    color: #aaa;
  }

  #write {
    background: #44dcd3;
    color: #333;
  }
`;

const PlayerWrap = styled.div`
  margin: 1rem auto;
  width: 100%;
  height: 80vh;
  border: 1px solid #ddd;
  border-radius: 1rem;
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
  width: 90%;
  margin: auto;

  .guidetrack {
    background: transparent;
    height: 1px;
    width: 95%;
    margin: auto;
    position: relative;
  }
`;

const ProgressBar = styled.input`
  -webkit-appearance: none;
  overflow: hidden;
  width: 100%;
  height: 2rem;
  background: #ddd;
  border-radius: 2rem;
  z-index: 1;

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 2rem;
    height: 2rem;
    border-radius: 2rem;
    background: #fff;
    box-shadow: -21rem 0px 0 20rem #4addd0;
    cursor: pointer;
  }
`;

const CropBar = styled.div`
  width: 100%;
  margin: 0 auto 0.4rem;
  height: 1rem;
  position: relative;
`;
const StartPt = styled.input`
  -webkit-appearance: none;
  background: transparent;
  position:absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  min-width: 0.8rem;

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 1.5rem;
    width: 0.8rem;
    border-radius: 0 0 0 1rem;
    background: #fff;
    cursor: pointer;
  }
`;

const EndPt = styled.input`
  -webkit-appearance: none;
  background: transparent;
  position:absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 0.8rem;

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 1.5rem;
    width: 0.8rem;
    border-radius: 0 0 1rem 0;
    background: #fff;
    cursor: pointer;
  }
`;

const PlayStatus = styled.div`
  width: 88%;
  margin: 1.5rem auto 2rem auto;
  color: #fff;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }

  .playbtn {
    font-size: 2.4rem;
    margin-right: 1.5rem;
    cursor: pointer;
  }

  #testplay {
    cursor:pointer;
  }
`;

const ThumbIndicator = styled.div`
  position: absolute;
  top: -4.5rem;
  left: ${(props) => (props.position / props.duration) * 100}%;
  transform: translate(-45%, 0);

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
    color: #fff;
  }
`;
