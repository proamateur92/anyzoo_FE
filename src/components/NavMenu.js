import React from 'react';

// style
import styled from 'styled-components';

// element
import { BsPlusLg } from 'react-icons/bs';

//component
import NavCircle from './NavCircle';

//route
import { useNavigate, useLocation } from 'react-router-dom';

const NavMenu = () => {
  const navigate = useNavigate();
  const [circleOn, setCircleOn] = React.useState(false);
  const dontShowIn = ['/login', '/signup', '/user/findId', '/user/findPassword'];
  const currentLocation = useLocation().pathname;

  return dontShowIn.includes(currentLocation) ? null : (
    <NavWrap>
      <Inner>
        <LeftBtn onClick={() => navigate('/post')}> 자랑하개 </LeftBtn>
        <RightBtn onClick={() => navigate('/reels')}> 릴스 </RightBtn>

        <RoundOuter>
          <MidCover />
          <RoundInner>
            <RoundBtn onClick={() => setCircleOn(true)}>
              <BsPlusLg />
            </RoundBtn>
          </RoundInner>
        </RoundOuter>
      </Inner>

      {circleOn ? <NavCircle setCircleOn={setCircleOn} /> : null}
    </NavWrap>
  );
};

export default NavMenu;

const NavWrap = styled.div`
  position: fixed;
  width: 100%;
  max-width: 600px;
  height: 10.25vh;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 100;
`;

const Inner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    font-size: 1.8rem;
    font-weight: bold;
  }
`;

const LeftBtn = styled.div`
  background: #fff;
  height: 100%;
  margin-bottom: -0.1rem;
  width: 45.3%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px -1px 4px 0px rgba(0, 0, 0, 0.25);

  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  white-space: nowrap;

  border-radius: 0 3rem 0 0;
  cursor: pointer;
`

const RightBtn = styled.div`
  background: #fff;    
  height:100%;
  margin-bottom: -0.1rem;
  width: 45.3%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px -1px 4px 0px rgba(0, 0, 0, 0.25);

  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;

  border-radius: 3rem 0 0 0;
  cursor: pointer;
`;

const RoundOuter = styled.div`
  position: absolute;
  background: #fff;
  width: 6rem;
  height: 6rem;
  border-radius: 6rem;
  box-shadow: 0px -1px 4px 0px rgba(0, 0, 0, 0.25);
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
`
const MidCover = styled.div`
  background: #fff;
  position: absolute;
  height: 295%;
  width:110%;
  bottom: -218%;
  left:-5%;
  z-index: 100;
`

const RoundInner = styled.div`
  position: absolute;
  border-radius: 6rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 2px 0px rgba(0, 0, 0, 0.25);
  z-index: 200;

  cursor: pointer;
`;

const RoundBtn = styled.button`
  width: 73.3%;
  height: 73.3%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
  background-color: #4addd0;
  background-image: linear-gradient(to bottom, rgba(0, 148, 255, 0) 0%, #4ac6d0 100%);
  color: #fff;
`;
