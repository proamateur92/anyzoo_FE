// react
import { useEffect } from 'react';

// element
import Wrap from '../elements/Wrap';
import UserTop from '../elements/UserTop';

// style
import styled from 'styled-components';

// redux
import { useSelector } from 'react-redux';

// cookie
import { clearCookie, getCookie } from '../shared/cookie';

// router
import { useNavigate, useParams } from 'react-router-dom';
import instance from '../shared/axios';

const Mypage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isLogin = getCookie('accessToken') ? true : false;

  useEffect(()=>{
    try {
      const respnse = instance.get('/api/mypage/post');
      console.log(respnse.data);
    } catch(error) {
      console.log(error);
    }
  })
  useEffect(() => {
    if (!isLogin) navigate('/login');
  });

  // 회원정보 확인
  const userInfo = useSelector((state) => state.user.info);
  const logout = () => {
    clearCookie('accessToken');
    clearCookie('refreshToken');
    navigate('/');
  };

//   <Logout type='button' onClick={logout}>
//   로그아웃
// </Logout>
  return (
    <Wrap>
      <UserTop title='마이페이지' type='mypage' />
      <Profile>
        <img src={userInfo.img} alt='프로필 이미지' />
        <span>{userInfo.nickname}</span>
      </Profile>
      <Follow>
        <div>
          <span>팔로잉</span>
          <span>10</span>
        </div>
        <div>|</div>
        <div>
          <span>팔로우</span>
          <span>5</span>
        </div>
      </Follow>
      <Tap>
        <div>
          <span>자랑하기</span>
        </div>
        <div>
          <span>커뮤니티</span>
        </div>
        <div>
          <span>모집글</span>
        </div>
        <div>
          <span>릴스</span>
        </div>
      </Tap>
    </Wrap>
  );
};

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  margin-top: 3%;
  img {
    width: 4em; 
    height: 4em;
    border-radius: 50%;
  }
  span {
    display: block;
    margin: 3.5% 0 5% 0;
  }
`;

const Follow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 6%;
  div {
    display: flex;
    flex-direction: column;
  }
  div:nth-of-type(2) {
    margin: 0 4%;
    font-size: 1px;
    color: #D9D9D9;
  }
  span:first-of-type {
    margin: 2% 0;
  }
`;

const Tap = styled.div`
  display: flex;
  font-size: 12px;
  font-weight: 800;
  border-top: 1.5px solid #D9D9D9;
  border-bottom: 1.5px solid #D9D9D9;
  div {
    padding: 5%;
    width: 25%;
    cursor: pointer;
    text-align: center;
  }
  div:hover {
    background-color: red;
  }
`;

const Logout = styled.button`
  width: 90%;
  padding: 3% 2%;
  border-radius: 10px;
  margin: 0 auto;
  background-color: #ffffff;
  color: #F91F1F;
  font-size: 18px;
  font-weight: 800;
  border: 2px solid #F91F1F;
`;

export default Mypage;
