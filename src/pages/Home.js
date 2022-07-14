import React, { useEffect } from 'react';

// 컴포넌트
import Wrap from '../elements/Wrap';
import PostCard from '../components/PostCard';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Home = () => {
  return (
    <Wrap>
      <Logo />
      <div>
        <Banner />
      </div>

      <div>
        <p>오늘의 인기상</p>
        <div />
        <span>vs</span>
        <div />
      </div>
    </Wrap>
  );
};

export default Home;

const Logo = styled.div`
  width: 100%;
  height: 80px;
  background: url('https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FuVWP5%2FbtrGariHl5C%2FgZPDKkUbrtI4XpAFfR8xm0%2Fimg.png')
    no-repeat center;
  background-size: 20%;
`;
const Banner = styled.div`
  background: url('https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcOraWH%2FbtrGaJclSXN%2FGrJANxFBQGKNzizjQdX6uk%2Fimg.png')
    no-repeat center;
  background-size: contain;
  height: 240px;
  width: 100%;
`;
