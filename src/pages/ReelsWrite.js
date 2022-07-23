import React from "react";
import Wrap from "../elements/Wrap";

// style
import styled from "styled-components";

// axios
// import instance from '../shared/axios';

// video converter
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { fnExtractFrameToJPG } from 'ffmpeg'

// video player
import ReactPlayer from 'react-player/lazy'

const ffmpeg = createFFmpeg({ log: true });

const ReelsWrite = ( props ) => {
  const textRef = React.useRef()
  const [video, setVideo] = React.useState(null)
  const [videoUrl, setVideoUrl] = React.useState(null)
  const [thumbOpt, setThumbOpt] = React.useState(null)
  const [thumb, setThumb] = React.useState(null)
  const [playPreview, setPlayPreview] = React.useState(false)


  const addVideo = (e) => {
    const uploaded = e.target.files[0]

    if (uploaded.type.split('/')[0] === 'video') {
      console.log('영상입니다!')
      console.log(uploaded)
      turnVideoFfmpeg(uploaded)
      setVideo(uploaded)
      setVideoUrl(URL.createObjectURL(uploaded))
    } else {
      window.alert('영상 파일만 업로드 가능합니다')
    }

  }

  const turnVideoFfmpeg = async (video) => {
    const fileName = video.name.split('.').shift()
    const fileExt = video.name.split('.').pop()
    const to_img_file = './test'

    console.log(video)

    await ffmpeg.load()
    ffmpeg.FS('writeFile', video.name , await fetchFile(video))
    await ffmpeg.run('-i', video.name , 'test.mp4')
    const testdata = ffmpeg.FS('readFile', 'test.mp4')

    console.log('테스트데이터', testdata)

    let img_option = {
      start_time : 0,
      frame_rate : 1,
      number : 4,
      file_name : 'file_%t_%s'
  }
    console.log(testdata.fnExtractFrameToJPG(to_img_file, img_option, (error, files)=>{
      if(!error) {
          //완료 행위
      }
  })   )


  }
  
  const addReels = () => {
    const formData = new FormData();
    formData.append('thumbnail', thumb);
    // formData.append('video', video);
  }


  console.log(playPreview)

  return (
    <Wrap>
      <Header> 릴스 </Header>

      <Contents>
        <p> 영상 올리기 </p>
        <input type='file' onChange={(e) => addVideo(e)}/>
        
        <p> 다듬기 (15sec)</p>
        <div>

        </div>

        <p> 커버사진 </p>

        <p> 미리보기 </p>

        <PlayerWrap onClick={()=> setPlayPreview(!playPreview)}> 
            <ReactPlayer 
              url={videoUrl} 
              width={'100%'} 
              height={'100%'} 
              playing={playPreview}
            />
        </PlayerWrap>


        <p> 게시글 내용 </p>

        <textarea ref={textRef}>

        </textarea>


      </Contents>

      <Buttons>
        <button> 취소 </button>
        <button onClick={() => addReels()}> 작성하기 </button>
      </Buttons>
    
    </Wrap>
  )
}


export default ReelsWrite

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 7.5vh;
  color: #333;
  font-size: 1.8rem;
  font-weight: bold;
`
const Contents = styled.div`
  width: 80%;
  margin: auto;

  p{
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
`

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
`

const PlayerWrap = styled.div`
  margin: auto;
  width: 75%;
  height: 60vh;
  background: #000;
`