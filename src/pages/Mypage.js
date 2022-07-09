// element
import { useEffect } from 'react';
import Wrap from '../elements/Wrap';

// axios
import instance from '../shared/axios';

// redux
import { useSelector } from 'react-redux';

const Mypage = () => {
  // 회원정보 확인
  useSelector(state => console.log(state));
  useSelector(state => console.log(state.user.list));

  return (
    <Wrap>
      <span>마이페이지 화면</span>
    </Wrap>
  );
};

export default Mypage;
