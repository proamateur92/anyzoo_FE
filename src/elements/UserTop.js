// style
import styled from 'styled-components';

// icon
import { IoIosArrowBack } from 'react-icons/io';

// router
import { useNavigate } from 'react-router-dom';

const UserTop = ({ title }) => {
  const navigate = useNavigate();
  return (
    <Top>
      <IoIosArrowBack
        style={{
          position: 'absolute',
          cursor: 'pointer',
          left: '2%',
          margin: 'auto',
          fontSize: '35px',
          height: '100%',
        }}
        onClick={() => navigate('/login')}
      />
      <span>{title}</span>
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
  height: 20vw;
  margin-bottom: 10%;
`;

export default UserTop;
