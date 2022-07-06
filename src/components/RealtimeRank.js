import React from "react";

// style
import styled from "styled-components";

const RealTimeRank = () => {

  return (

    <RealTimeRanking>
    <h3>오늘의 인기상(실시간 랭킹)</h3>
    <RealTimeTopRanker>
      <RankerPreview />
        vs
      <RankerPreview />
    </RealTimeTopRanker>
    <div className="votebar"> <span>000표</span> <span>000표</span> </div>
  </RealTimeRanking>

  )

}

export default RealTimeRank


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
