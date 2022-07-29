import Wrap from '../elements/Wrap';
import styled from 'styled-components';

// router
import { useNavigate } from 'react-router-dom';

// icons
import { FiImage } from "react-icons/fi";

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Wrap>
      <Message>
        <span id='icon'> <FiImage/> </span>
        <p> 텅 비었다</p>
      </Message>
      <GoBackBtn onClick={()=> navigate(-1)}> 돌아가기 </GoBackBtn>
    </Wrap>
  );
};

export default NotFound;

const Message = styled.div`
  margin: auto;
  width: 100%;
  height: 60vh;
  padding-top: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  #icon{
    color: #ccc;
    font-size: 2.4rem;
  }

  p{
    color: #ccc;
    font-size: 1.4rem;
  }
`

const GoBackBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 67%;
  height: 5rem;
  margin: auto;
  background-color: #44dcd3;
  border-radius: 1rem;
  font-size: 1.6rem;
`