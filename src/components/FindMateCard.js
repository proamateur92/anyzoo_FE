import React from "react";

// style
import styled from "styled-components";

const FindMateCard = () => {

  return (

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

  )

}

export default FindMateCard


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