import React from "react";

// style
import styled from "styled-components";

const WeeklyRank = () => {

  return (

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
  )

}

export default WeeklyRank


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

