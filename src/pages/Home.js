import React from "react";

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
  const postRef = React.useRef()

  const loadPosts = () => {
    dispatch(loadPostsDB())
    console.log('요청')
  }

  React.useEffect(() => {
    // loadPosts()
  },[])

  const observer = new IntersectionObserver(loadPosts, { threshold : 0.5 });

  


  return (
    <Wrap>
      <Logo />
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

      <SubTitle ref={postRef}>
        <h3>자랑하기</h3>
        <GrNext />
      </SubTitle>

      {posts.map((post) => (
        <PostCard key={post.postId} data={post} />
      ))}
    </Wrap>
  );
};

export default Home;

const Logo = styled.div`
  width: 100%;
  height: 80px;
  background: url("https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FuVWP5%2FbtrGariHl5C%2FgZPDKkUbrtI4XpAFfR8xm0%2Fimg.png")
    no-repeat center;
  background-size: 20%;
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
