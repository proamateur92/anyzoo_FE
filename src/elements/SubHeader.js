// CSS 관련 임포트
import styled from 'styled-components';

import { FiFeather } from "react-icons/fi";

const SubHeader = (props) => {
  return (
    <HeaderWrap>
      <span> <FiFeather id='icon'/> { props.title }</span>
      { props.children }
    </HeaderWrap>
  );
};

export default SubHeader;

const HeaderWrap = styled.div`
box-sizing: border-box;
width: 100%;
height: 7.54vh;
border-bottom: 2px solid rgba(0, 0, 0, 0.1);
font-size: 1.8rem;

display: flex;
justify-content: space-between;
align-items: center;
padding: 0 10%;
border: 1px solid #efefef;

span {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1.8rem;
  font-weight: bold;
  color: #000;

  #icon {
    color: #37d8cf;
    font-size: 2.4rem;
  }
  }
`
