import React from "react";

// router
import { useNavigate } from "react-router-dom";

// style
import styled from "styled-components";

// icon
import { FiUser } from "react-icons/fi";

const TogetherCard = (props) => {
  const navigate = useNavigate();
  const data = props.data;

  const today = new Date();
  const month = today.getMonth() > 9 ? today.getMonth() + 1 : "0" + (today.getMonth() + 1);
  const todayString = today.getFullYear() + "-" + month + "-" + today.getDate();

  const createdAt = data?.dateTime;
  const createdAtDisplay =
    todayString !== createdAt?.split("T")[0]
      ? createdAt?.split("T")[0].substr(5)
      : createdAt?.split("T")[1].substr(0, 5);

  return (
    <CardOuter>
      <FindMate onClick={() => navigate("/recruit/detail/" + data.boardMainId)}>
        <CardImg />

        <CardContent>
          <Title>
            <h5 id="title"> {data?.title}</h5>
            <span id="time">{createdAtDisplay}</span>
          </Title>
          <p>
            {data?.contents} <br />
            <span id="dot">.</span>
          </p>

          <AdditionalInfo>
            <div>
              <span className="address">#{data?.cityName}</span>
              <span className="address">#{data?.provinceName}</span>
            </div>
            <span>
              {" "}
              <FiUser className="icon" /> {data?.peopleCnt}/{data?.limitPeople}
            </span>
          </AdditionalInfo>
        </CardContent>
      </FindMate>
    </CardOuter>
  );
};

export default TogetherCard;

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
  cursor: pointer;
  overflow: hidden;
`; 

const FindMate = styled.div`
  width: 90%;
  position: absolute;
  top: 15%;
  left: 5%;
  display: flex;
`;

const CardImg = styled.div`
  width: 30%;
  min-width: 30%;
  padding-top: 30%;
  background: url("https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdCUQ7g%2FbtrHpn7Oxdq%2Fb5VN04Jr1ukG5rTvrWT8O0%2Fimg.png");
  background-size: cover;
  background-position: center;
  border-radius: 2rem;
`;

const CardContent = styled.div`
  width: 65%;
  margin-left: 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 0;

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin: 1rem 0;

    color: #666;
    font-size: 1.6rem;
    line-height: 1.5;
  }

  #dot {
    color: #fff0;
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
    font-size: 2rem;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    font-size: 1.4rem;
    color: #b4b4b4;
    white-space: nowrap;
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
    white-space: nowrap;
    max-width: 50%;
  }

  .icon {
    font-size: 1.4rem;
  }
`;
