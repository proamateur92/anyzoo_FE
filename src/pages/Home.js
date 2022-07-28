// react
import React, { useCallback } from 'react';

// element
import Wrap from '../elements/Wrap';

// component
import PostCard from '../components/PostCard';
import NoticeSlide from '../components/NoticeSlide';
import RealTimeRank from '../components/RealtimeRank';
import WeeklyRank from '../components/WeeklyRank';
import TogetherSlide from '../components/TogetherSlide';

// style
import styled from 'styled-components';

// icons
import { FiAward, FiFeather, FiChevronRight } from 'react-icons/fi';

// redux
import { useSelector, useDispatch } from 'react-redux';

// postSlice
import { loadPostsDB } from '../redux/modules/postSlice';

// router
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.list);
  const isLastPg = useSelector((state) => state.post.last);
  const postEndRef = React.useRef();
  const [page, setPage] = React.useState(-1);

  const loadinghandler = useCallback(
    (entries) => {
      if (entries[0].isIntersecting && !isLastPg) {
        setPage((page) => page + 1);
      }
    },
    [isLastPg]
  );

  React.useEffect(() => {
    const observer = new IntersectionObserver(loadinghandler, { threshold: 0.5 });
    if (postEndRef.current) {
      observer.observe(postEndRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [loadinghandler]);

  React.useEffect(() => {
    if (page >= 0 && !isLastPg) {
      const pageInfo = { page: page, sorting: 'all' };
      dispatch(loadPostsDB(pageInfo));
      console.log('새 페이지 로딩');
    } else {
      console.log('마지막 페이지');
    }
  }, [page, dispatch, isLastPg]);

  return (
    <Wrap>
      <Logo> ANYZOO </Logo>

      <NoticeSlide />

      <SubTitle> <FiAward className="icon"/> <h3>오늘의 인기상</h3> </SubTitle>
      <RealTimeRank />

      <SubTitle> <FiAward className="icon"/> <h3>주간 랭킹</h3> </SubTitle>
      <WeeklyRank />

      <SubTitle>
        <h3> <FiFeather className="icon"/> 산책 메이트 모집 글</h3>
        <FiChevronRight className="moveto"/>
      </SubTitle>

      <TogetherSlide />

      <SubTitle>
        <h3> <FiFeather className="icon"/> 자랑하기</h3>
        <FiChevronRight className="moveto" onClick={()=> navigate('/post')}/>
      </SubTitle>

      {posts.map((post) => (
        <PostCard key={post.boardMainId} data={post} />
      ))}

      <div ref={postEndRef} />
    </Wrap>
  );
};

export default Home;

const Logo = styled.div`
  width: 100%;
  height: 80px;
  background: #4addd0;
  display: flex;
  justify-content: center;
  align-items: center;

  color: #fff;
  font-weight: bolder;
  font-size: 2.7rem;
`;

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 3.5rem 10% 1rem 10%;

h3 {
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  white-space: nowrap;
  letter-spacing: -0.15rem;
}

.icon {
  font-size: 2.6rem;
  color: #29d5ca;
  margin-right: 0.5rem;
}

.moveto {
  font-size: 2.4rem;
  margin-left: 0.5rem;
  color: #c2c2c2;
  cursor:pointer;
}

`;
