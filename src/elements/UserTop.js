// style
import styled from 'styled-components';

// icon
import { IoIosArrowBack } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';

// router
import { useNavigate } from 'react-router-dom';

const UserTop = ({ title, type }) => {
  const navigate = useNavigate();
  let progress = '';
  if(type === 'signup') {
    progress = (
      <div style={{widht: '50px', height: '50px', backgroundColor: 'red'}}>a</div>
    )
  } 

  return (
    <Top>
      <Icon onClick={() => navigate('/login')}>
        <IoIosArrowBack />
      </Icon>
      <span>{title}</span>
      {progress}
      <Icon>
        {type==='mypage' && <GiHamburgerMenu />}
      </Icon>
    </Top>
  );
};

const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 18px;
  text-align: center;
  height: 18vw;
  span {
    font-weight: 800;
  }
`;

const Icon = styled.div`
  position: absolute;
  &:first-of-type {
    left: 0;
  }
  &:nth-of-type(2) {
    right: 2%;
  }
  cursor: pointer;
  font-size: 35px;
`;

export default UserTop;
