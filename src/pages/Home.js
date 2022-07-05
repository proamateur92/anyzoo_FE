import React from "react";

// element
import Wrap from "../elements/Wrap";

// component
import PostCard from "../components/PostCard";
import NoticeSlide from "../components/NoticeSlide";

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

  React.useEffect(() => {
    dispatch(loadPostsDB());
  }, []);

  return (
    <Wrap>
      <Logo />

      <NoticeSlide />
    
      <RealTimeRanking>
        <h3>오늘의 인기상(실시간 랭킹)</h3>
        <RealTimeTopRanker>
          <RankerPreview />
            vs
          <RankerPreview />
        </RealTimeTopRanker>
        <div className="votebar"> <span>000표</span> <span>000표</span> </div>
      </RealTimeRanking>


      <CategoryRanking>
        <div className="rankingCate">
          <span> 귀여움 </span>
          <span> 멋짐 </span>
          <span> 예쁨 </span>
          <span> 웃김 </span>
        </div>

        <div className="cateRankerList">
          <div className="cateRankerPic"/>
          <div>
            <p><span>1위</span> 닉네임입니다아</p>
            <div className="votebar"><span>000표</span></div>
          </div>
        </div>

        <div className="cateRankerList">
          <div className="cateRankerPic"/>
          <div>
            <p><span>1위</span> 닉네임입니다아</p>
            <div className="votebar"><span>000표</span></div>
          </div>
        </div>

        <div className="cateRankerList">
          <div className="cateRankerPic"/>
          <div>
            <p><span>1위</span> 닉네임입니다아</p>
            <div className="votebar"><span>000표</span></div>
          </div>
        </div>

      </CategoryRanking>

      <SubTitle>
        <h3>산책 메이트 모집 글</h3>
        <span>
          <GrNext />
        </span>
      </SubTitle>

      <FindMate>
        <div className="cardimg" />
        <div className="cardContents">
          <h5>
            {" "}
            타이틀 위치 <span>3분 전</span>
          </h5>
          <p> 모집글 내용이 들어갑니다. 모집글 내용이 들어갑니다. 모집글 내용이 들어갑니다. </p>
          <div className="cardFooter">
            <div className="userProfile">
              {" "}
              <div /> 닉네임{" "}
            </div>
            <div className="participants"> 7/10 </div>
          </div>
        </div>
      </FindMate>

      <SubTitle>
        <h3>자랑하기</h3>
        <span>
          <GrNext />
        </span>
      </SubTitle>

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

const SubTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
  border: 1px solid #efefef;

  h3 {
    font-weight: bold;
  }
`;

const RealTimeRanking = styled.div`
display:flex;
flex-direction: column;
padding: 30px;

h3 {
    font-weight: bold;
    margin-bottom: 20px;
  }

  .votebar {
    height:30px;
    background: #eee;
    margin: 20px;
    display: flex;
    justify-content: space-between;
    align-items:center;
    padding: 0px 20px;
  }
`;

const RealTimeTopRanker = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RankerPreview = styled.div`
  width: 200px;
  height: 200px;
  margin: 10px;
  background: #ddd;
  border-radius: 200px;
`;


const CategoryRanking = styled.div`
margin: 20px;
.rankingCate {
  display: flex;
  justify-content: space-between;
  padding: 30px;
}

.cateRankerList {
  display:flex;
  align-items: center;

  border-bottom: 2px solid #ddd;
}

.cateRankerPic {
  width: 80px;
  height: 80px;
  margin: 10px;
  background: #ddd;
  border-radius: 80px;
}

.votebar {
    height:30px;
    background: #eee;
    margin: 20px;
    display: flex;
    justify-content: space-between;
    align-items:center;
    padding: 0px 20px;
  }

`

const FindMate = styled.div`
  width: 90%;
  height: 150px;
  margin: 20px auto;
  padding: 10px;
  border: 1px solid #eee;
  padding: 10px;
  display: flex;

  .cardimg {
    min-width: 130px;
    height: 130px;
    margin: 10px;
    background: #ddd;
    border-radius: 150px;
  }

  .cardContents {
    margin: 20px;
  }

  h5 {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .cardFooter {
    display: flex;
    margin-top: 10px;
  }
`;
