// react
import React from "react";

// style
import styled from 'styled-components';

// route
import { useNavigate } from "react-router-dom"
import { history } from '../shared/history'

const PhotoModal = (props) => {
  const navigate = useNavigate()
  const backDropRef = React.useRef();
  const setModalOn = props.setModalOn;
  const photo = props.photo

  // 뒤로가기시 닫히도록 제어
  React.useEffect(()=>{
    const listenBackEvent = () => {
      document.body.style.overflow = "unset";
      setModalOn(false)
      navigate(1)
    }

    const unlistenBackEvent = history.listen( ({ action }) => {
      if (action === 'POP') {
        listenBackEvent()
      }
    })
    
    return unlistenBackEvent;
  },[])

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const modalClose = () => {
    document.body.style.overflow = "unset";
    setModalOn(false);
  };

  return (
    <Outer>
      <BackDrop ref={backDropRef} onClick={(e) => modalClose()}>
        <PhotoWrap>
          <Photo src={photo}/>
        </PhotoWrap>
      </BackDrop>
    </Outer>
  ) 
  

}

export default PhotoModal 

const Outer = styled.div`
  position: fixed;
  z-index: 200;
  height: 100%;
  width: 100%;
  max-width: 600px;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
`

const BackDrop = styled.div`
  width: 100%;
  height: 92vh;
  position:absolute;
  top: 0;
  left: 0;
  z-index: 10;

  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.1);
  display:flex;
  align-items: center;
  justify-content: center;
`;

const PhotoWrap = styled.div`
  width: 80%;
  background: #fff;
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3rem;
  margin-bottom: 3vh;
  display:flex;
  align-items: center;
  justify-content: center;
`

const Photo = styled.img`
  width: 90%;
  margin: 2rem;
  max-height: 90%;
  border-radius: 2rem;
`
