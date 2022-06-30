import Wrap from '../elements/Wrap';

// CSS 관련 임포트
import styled from 'styled-components';

const PostHeader = () => {
  return (
    <HeaderWrap>
      <span>자랑하기</span>
      
    </HeaderWrap>
  );
};

export default PostHeader;

const HeaderWrap = styled.div`
box-sizing: border-box;
width: 100%;
padding: 20px;
border-bottom: 2px solid rgba(0, 0, 0, 0.1);
font-size: 20px;
`
