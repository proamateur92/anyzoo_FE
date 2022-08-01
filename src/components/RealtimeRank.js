// react
import React from 'react';

// axios
import instance from '../shared/axios';

// router
import { useNavigate } from 'react-router-dom';

// style
import styled from "styled-components";


const RealTimeRank = () => {
  const navigate = useNavigate();
  const [rankers, setRankers] = React.useState([null, null]);
  const firstCount = rankers[0]?.likeCnt ? rankers[0]?.likeCnt : 0
  const secondCount = rankers[1]?.likeCnt ? rankers[1]?.likeCnt : 0

  React.useState(async () => {
    const list = await instance.get('/api/rank/day').catch((err) => console.log(err));
    list && setRankers(list.data);
  }, []);

  return (
    <RealTimeRanking>
      <RealTimeTopRanker>
        <RankerPreview img={rankers[0]?.img[0]?.url}
          onClick={() => navigate('/post/detail/' + rankers[0].boardMainId)}
        />
        <span>vs</span>
        <RankerPreview
          img={rankers[1]?.img[0]?.url}
          onClick={() => navigate('/post/detail/' + rankers[1].boardMainId)}
        />
      </RealTimeTopRanker>

      <VoteBar data={rankers} total={firstCount + secondCount}>
        <div> {rankers[0]?.likeCnt ? rankers[0]?.likeCnt.toLocaleString() : '-'}표 </div>
        <div> {rankers[1]?.likeCnt ? rankers[1]?.likeCnt.toLocaleString() : '-'}표 </div>
      </VoteBar>
    </RealTimeRanking>
  );
};

export default RealTimeRank;

const RealTimeRanking = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 10%;
`;

const RealTimeTopRanker = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    color: #ebebeb;
    font-size: 3rem;
    font-weight: 600;
  }
`;
const RankerPreview = styled.div`
  width: 43.33%;
  padding-top: 43.33%;
  border-radius: 200px;
  background: url(${(props) => props.img ? props.img : 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F247za%2FbtrIyZr7Y3Q%2FaD8KI3MbFUTW3gl0SHe7hk%2Fimg.png'});
  background-size: cover;
  background-position: center;
  cursor: pointer;
`;

const VoteBar = styled.div`
  margin-top: 1.4rem;
  height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 100%;
    padding: 0 1rem;
    color: #0000004d;
    font-size: 1.4rem;
    font-weight: 600;
  }

  & div:first-of-type {
    border-radius: 20px 0px 0px 20px;
    background: #44dcd3;
    width: ${(props) => props?.data[0]?.likeCnt ? (props?.data[0]?.likeCnt / props?.total) * 100 : 50}%;
  }

  & div:last-of-type {
    justify-content: flex-end;
    border-radius: 0px 20px 20px 0px;
    background: #ffcf23;
    width: ${(props) => props?.data[1]?.likeCnt ? (props?.data[1]?.likeCnt / props?.total) * 100 : 50}%;
  }
`;
