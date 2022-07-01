import Wrap from '../elements/Wrap';

// CSS 관련 임포트
import styled from 'styled-components';

const EditBubble = () => {
  return (
    <Bubble>
      <p>수정하기</p>
      <p>삭제하기</p>
    </Bubble>
  );
};

export default EditBubble;

const Bubble = styled.div`
width: 100px;
box-sizing: border-box;
border: 1px solid #ddd;
border-radius: 30px 0px 30px 30px;
box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
font-size: 16px;
text-align: center;

background: #fff;

position: absolute;
top: 30px;
right: 10px;

  p{
    margin: 20px 0px;
  }
`
