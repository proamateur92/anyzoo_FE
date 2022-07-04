import React from "react";

// element
import Wrap from "../elements/Wrap";

// component
import PostCard from "../components/PostCard";
import NoticeSlide from "../components/NoticeSlide";

// style
import styled from "styled-components";

// redux
import { useSelector, useDispatch } from "react-redux";
import { loadPostsDB } from "../redux/modules/postSlice";

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.list);

  React.useEffect(() => {
    dispatch(loadPostsDB());
  }, []);

  return (
    <Wrap>
      <Logo />
      <div>
        <NoticeSlide />
      </div>

      <div>
        <p>오늘의 인기상</p>
        <div />
        <span>vs</span>
        <div />
      </div>

      <div>
        <h3>산책 메이트 모집 글</h3>
      </div>

      <div>
        <h3>자랑하기</h3>
      </div>
      
      {posts.map((post, i) => (
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
const Banner = styled.div`
  background: url("https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcOraWH%2FbtrGaJclSXN%2FGrJANxFBQGKNzizjQdX6uk%2Fimg.png")
    no-repeat center;
  background-size: contain;
  height: 240px;
  width: 100%;
`;
