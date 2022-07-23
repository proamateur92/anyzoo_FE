import React, { useCallback } from "react";

// element
import Portal from "../elements/Portal";

// style
import styled from "styled-components";
import { FiPlus, FiMessageSquare, FiUser, FiHome, FiStar, FiFilm } from "react-icons/fi";

// route
import { useNavigate, useLocation } from "react-router-dom";

const NavCircle = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const setCircleOn = props.setCircleOn;
  const backDropRef = React.useRef();
  const [plusOpen, setPlusOpen] = React.useState(false);
  const [writeOpt, setWriteOpt] = React.useState(null);

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

  React.useEffect(() => {
    switch (location.pathname) {
      case '/reels' :
        setWriteOpt (
        <> 
          <div onClick={() => moveTo("/reels/write")}> 릴스 작성 </div> 
        </>)
        break
      case '/community' :
        setWriteOpt(          
        <>
          <div onClick={() => moveTo("/")}> 커뮤니티 글 작성 </div>
          <div onClick={() => moveTo("/")}> 산책모집 작성 </div>
        </>)
        break
      default :
      setWriteOpt(          
        <>
          <div onClick={() => moveTo("/post/write")}> 자랑글 작성 </div>
        </>)
        break
    }
  }, [location.pathname, moveTo])

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

          <Menu order={0} onClick={() => moveTo("/")}>
            <FiMessageSquare className={"icons"} />
            <h5> 채팅 </h5>
          </Menu>

          <Menu order={1} onClick={() => moveTo("/mypage")}>
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

          <Menu order={4} onClick={() => moveTo("/reels")}>
            <FiFilm className={"icons"} />
            <h5> 릴스 </h5>
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

const MenuCircle = styled.div`
  width: 60%;
  min-width: 180px;
  height: 60vw;
  min-height: 180px;
  max-height: ${600 * 0.6}px;
  border-radius: 600px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: -5%;
  position: relative;
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
