// react
import React from "react";

// style
import styled from 'styled-components';

// route
import { useNavigate } from "react-router-dom"
import { history } from '../shared/history'

const Drawers = (props) => {
  const navigate = useNavigate()
  const backDropRef = React.useRef();
  const setDrawerOn = props.setDrawerOn;

  // 뒤로가기시 닫히도록 제어
  React.useEffect(()=>{
    const listenBackEvent = () => {
      setDrawerOn(false)
      navigate(1)
    }

    const unlistenBackEvent = history.listen( ({ action }) => {
      if (action === 'POP') {
        listenBackEvent()
      }
    })
    
    return unlistenBackEvent;
  },[])

  const closeDrawer = (e) => {
      setDrawerOn(false);
  };

  return (
    <>
    <BackDrop ref={backDropRef} onClick={(e) => closeDrawer(e)}></BackDrop>
    <DrawerWrapper>
      { props.children }
    </DrawerWrapper>
    </>
  ) 
  

}

export default Drawers 

const DrawerWrapper = styled.div`
  width: 100%;
  height: 88vh;
  padding-bottom: 10.25vh;
  background: #fff;
  position:fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 10;
  max-width: 600px;
  margin: auto;
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3rem 3rem 0 0 ;
`

const BackDrop = styled.div`
  position: fixed;
  z-index: 9;
  height: 100%;
  width: 100%;
  max-width: 600px;
  top:0;
  left: 50%;
  transform: translate(-50%, 0);


  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.1);
`;