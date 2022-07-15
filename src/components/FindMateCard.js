import React from "react";

// style
import styled from "styled-components";

import { FiUser } from "react-icons/fi";

const FindMateCard = () => {
  return (
    <CardOuter>
      <FindMate>
        <CardImg />
        <CardContent>
          <Title>
            <h5 id="title"> 산책모집 방 제목 ff</h5>
            <span id="time">3분 전</span>
          </Title>
          <p> 모집글 내용이 들어갑니다. 모집글 내용이 들어갑니다. 모집글 내용이 들어갑니다. </p>
          <AdditionalInfo>
            <div>
              <span className="address">#머머구</span>
              <span className="address">#머머동</span>
            </div>
            <span> <FiUser className="icon" /> 7/10 </span>
          </AdditionalInfo>
        </CardContent>
      </FindMate>
    </CardOuter>
  );
};

export default FindMateCard;

const CardOuter = styled.div`
  width: 100%;
  padding-top: 42.67%;
  margin: 0.5rem auto;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px #f2f2f2;
  border-radius: 30px;
  background-color: #fff;
  position: relative;
  flex-shrink: 0;
  cursor:pointer;
`;

const FindMate = styled.div`
  position: absolute;
  top: 18.75%;
  left: 5.81%;
  display: flex;
`;

const CardImg = styled.div`
  width: 30%;
  padding-top: 30%;
  background: url('https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdCUQ7g%2FbtrHpn7Oxdq%2Fb5VN04Jr1ukG5rTvrWT8O0%2Fimg.png');
  background-size: cover;
  background-position: center;
  border-radius: 2rem;
`;

const CardContent = styled.div`
  width: 62%;
  margin-left: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin: 1rem 0;

    color: #666;
    font-size: 1.4rem;
    line-height: 1.5;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90.48%;

  h5 {
    display: block;
    width: 69.84%;
    font-size: 1.8rem;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    font-size: 1.2rem;
    color: #b4b4b4;
  }
`;

const AdditionalInfo = styled.div`
  width: 90.48%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    gap: 0.5rem;
  }

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.2rem;
    color: #b4b4b4;
  }

  .address {
    border: 1px solid #d1d1d6;
    padding: 0.5rem 0.7rem;
    border-radius: 30rem;
  }

  .icon {
    font-size: 1.4rem;
  }
`;
