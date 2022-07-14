import React, { useCallback } from "react";

// element
import Wrap from "../elements/Wrap";
import SubHeader from "../elements/SubHeader";
// component
import PostCard from "../components/PostCard";
import NoticeSlide from "../components/NoticeSlide";
import RealTimeRank from "../components/RealtimeRank";
import WeeklyRank from "../components/WeeklyRank";
import FindMateCard from "../components/FindMateCard";

import Comment from "../components/Comment";

// style
import styled from "styled-components";
import { GrNext } from "react-icons/gr";

// redux
import { useSelector, useDispatch } from "react-redux";
import { loadPostsDB } from "../redux/modules/postSlice";

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.list);
  const isLastPg = useSelector((state) => state.post.last);
  const postEndRef = React.useRef();
  const [page, setPage] = React.useState(-1);

  const loadinghandler = useCallback((entries) => {
    if (entries[0].isIntersecting && !isLastPg) {
      setPage((page) => page + 1);
    }
  }, [isLastPg]);

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
    if ( page >= 0 && !isLastPg) {
      const pageInfo = { page: page, sorting: 'all' }
      dispatch(loadPostsDB(pageInfo));
      console.log("새 페이지 로딩");
    } else {
      console.log("마지막 페이지");
    }
  }, [page, dispatch, isLastPg]);

  return (
    <Wrap>
      <Logo> ANYZOO </Logo>
      {/* <Comment postId={0}/> */}

      <NoticeSlide />

      <RealTimeRank />

      <SubTitle>
        <h3>주간</h3>
        <GrNext />
      </SubTitle>

      <WeeklyRank />

      <SubTitle>
        <h3>산책 메이트 모집 글</h3>
        <GrNext />
      </SubTitle>

      <FindMateCard />

      <SubTitle>
        <h3>자랑하기</h3>
        <GrNext />
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

  color:#fff;
  font-weight: bolder;
  font-size: 3.5rem;
`;

const SubTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
  border: 1px solid #efefef;

  h3 {
    font-weight: bold;
  }
`;
