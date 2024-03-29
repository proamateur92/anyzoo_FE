import React, { useCallback } from "react";

// element
import Portal from "../elements/Portal";

// style
import styled, { keyframes } from "styled-components";
import { FiPlus, FiMessageSquare, FiUser, FiHome, FiStar, FiDribbble, FiThumbsUp } from "react-icons/fi";

// route
import { useNavigate, useLocation } from "react-router-dom";
import { history } from '../shared/history'

// redux
import { useSelector } from "react-redux";

const NavCircle = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const setCircleOn = props.setCircleOn;
  const backDropRef = React.useRef();
  const userInfo = useSelector((state) => state.user.info);
  const [plusOpen, setPlusOpen] = React.useState(false);
  const [writeOpt, setWriteOpt] = React.useState(null);

    // 뒤로가기시 닫히도록 제어
    React.useEffect(()=>{
      const listenBackEvent = () => {
        document.body.style.overflow = "unset";
        setCircleOn(false);
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

  const moveTo = useCallback((url) => {
    navigate(url);
    document.body.style.overflow = "unset";
    setCircleOn(false);
  },[navigate, setCircleOn]);

  
  const closePlus = (e) => {
    if (e.target === backDropRef.current) {
      document.body.style.overflow = "unset";
      setCircleOn(false);
    }
  };

  const currentLocation = location.pathname.split('/')[1]

  React.useEffect(() => {
    switch (currentLocation) {
      case 'reels' :
        setWriteOpt (
        <> 
          <div onClick={() => moveTo("/reels/write/new")}> 릴스 작성 </div> 
        </>)
        break
      case 'community' :
        setWriteOpt(          
        <>
          <div onClick={() => moveTo("/community/write")}> 커뮤니티 글 작성 </div>
          <div onClick={() => moveTo("/recruit/write")}> 함께하개 글 작성 </div>
        </>)
        break
      case 'together':
        setWriteOpt(          
          <>
            <div onClick={() => moveTo("/community/write")}> 커뮤니티 글 작성 </div>
            <div onClick={() => moveTo("/recruit/write")}> 함께하개 글 작성 </div>
          </>)
          break
      default :
      setWriteOpt(          
        <>
          <div onClick={() => moveTo("/post/write")}> 자랑글 작성 </div>
        </>)
        break
    }
  }, [currentLocation, moveTo])

  return (
    <Portal>
      <BackDrop ref={backDropRef} onClick={(e) => closePlus(e)}>
        {plusOpen ? (
          <WriteMenu>
            {writeOpt}
          </WriteMenu>
        ) : null}

        <MenuCircle>
          <Center onClick={() => setPlusOpen(!plusOpen)}>
            <FiPlus />
          </Center>

          {/* <Menu order={0} onClick={() => window.alert("준비중인 메뉴입니다")}>
            <FiMessageSquare className={"icons"} />
            <h5> 채팅 </h5>
          </Menu> */}


          <Menu order={0} onClick={() => moveTo("/post")}>
            <FiThumbsUp className={"icons"} />
            <h5> 자랑하개 </h5>
          </Menu>


          <Menu order={1} onClick={() => moveTo(`/mypage/${userInfo.nickname}`)}>
            <FiUser className={"icons"} />
            <h5> 마이페이지 </h5>
          </Menu>

          <Menu order={2} onClick={() => moveTo("/")}>
            <FiHome className={"icons"} />
            <h5> 홈 </h5>
          </Menu>

          <Menu order={3} onClick={() => moveTo("/community")}>
            <FiStar className={"icons"} />
            <h5> 커뮤니티 </h5>
          </Menu>

          <Menu order={4} onClick={() => moveTo("/together")}>
            <FiDribbble className={"icons"} />
            <h5> 함께하개 </h5>
          </Menu>
        </MenuCircle>
      </BackDrop>
    </Portal>
  );
};

export default NavCircle;

const BackDrop = styled.div`
  position: fixed;
  z-index: 200;
  height: 100%;
  width: 100%;
  max-width: 600px;
  left: 50%;
  transform: translate(-50%, 0);

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.8);
`;

const WriteMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6vh;
  width: 47.5%;
  margin-bottom: 2.5vh;

  div {
    box-sizing: border-box;
    height: 8.75vh;
    width: 100%;
    border-radius: 11vh;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

const OpenAnimation = keyframes`
0% {
  width: 8rem;
  height: 8rem;
  margin-bottom: -20%;
}
100% {
  margin-bottom: -3%;
}
`

const MenuCircle = styled.div`
  width: 22.5rem;
  height: 22.5rem;
  border-radius: 60rem;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: -3%;
  position: relative;

  animation: ${OpenAnimation} 0.2s ease-in ;
  animation-iteration-count: 1;
`;

const Center = styled.div`
  margin: auto;
  width: 32.4%;
  height: 32.4%;
  min-height: 6rem;
  border-radius: 600px;

  background: #44dcd3;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  font-size: 2.4rem;

  box-shadow: inset 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  color: #fff;
`;

const Menu = styled.div`
  position: absolute;
  bottom: 40%;
  height: 20%;
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink:0;
  white-space: nowrap;
  gap: 0.5rem;
  color: #b2b2b2;
  cursor: pointer;

  transform: rotate(${(props) => (360 / 5) * props.order + "deg"}) translate(0, -170%)
    rotate(${(props) => -(360 / 5) * props.order + "deg"});

    h5 {
    font-size: 1.2rem;
  }

  .icons {
    font-size: 2.5rem;
  }
`;
