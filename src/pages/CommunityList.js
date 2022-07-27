import React from "react";

import Wrap from "../elements/Wrap";
import TogetherCard from "../components/TogetherCard";
import CommunityCard from "../components/CommunityCard";
import SetAddress from "../components/SetAddress";

// style
import styled from "styled-components";

import instance from "../shared/axios";

const CommunityList = () => {
  const [type, setType] = React.useState("together");
  const [city, setCity] = React.useState("all");
  const [province, setProvince] = React.useState("all");

  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    instance.get("/api/community?page=0").then((res) => setList(res.data.content));
  }, []);

  const changeType = (newType) => {
    setType(newType);
    window.scrollTo(0, 0);
  };

  const data = [
    {
      boardMainId: 1,
      title: "산책모집 방 제목",
      content: "모집글 내용이 들어갑니다. 모집글 내용이 들어갑니다.모집글 내용이 들어갑니다.",
      img: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdCUQ7g%2FbtrHpn7Oxdq%2Fb5VN04Jr1ukG5rTvrWT8O0%2Fimg.png",
      limitPeople: "10",
      date: "3분 전",
      location: "머머구",
      peopleCnt: "7",
      createdAt: "3분 전",
    },
  ];

  return (
    <Wrap>
      <Header type={type}>
        <div id="together" onClick={() => changeType("together")}>
          산책 메이트
        </div>
        <div id="community" onClick={() => changeType("community")}>
          커뮤니티
        </div>
      </Header>

      {type === "together" ? (
        <ListOption>
          <SetAddress setCity={setCity} setProvince={setProvince} />
        </ListOption>
      ) : null}

      <InnerWrap type={type}>
        {type === "together"
          ? data.map((item) => <TogetherCard key={item.boardMainId} data={item} />)
          : list.map((item) => <CommunityCard data={item} key={item.boardMainId} />)}
      </InnerWrap>
    </Wrap>
  );
};

export default CommunityList;

const Header = styled.div`
  position: fixed;
  top: 0px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 10;
  width: 100%;
  max-width: 599px;
  height: 6rem;
  display: flex;
  font-size: 1.8rem;
  font-weight: bold;
  color: #c2c2c2;
  background: #fff;

  div {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  #${(props) => props.type} {
    border-bottom: 0.2rem solid #44dcd3;
    color: #333;
  }
`;

const ListOption = styled.div`
  width: 100%;
  max-width: 600px;
  position: fixed;
  top: 6rem;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 9;
  background: rgba(255, 255, 255, 0.9);
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
`;

const InnerWrap = styled.div`
  width: ${(props) => (props?.type === "together" ? "90%" : "100%")};
  margin: auto;
  display: flex;
  flex-direction: column;
  padding-top: ${(props) => (props?.type === "together" ? "12rem" : "6rem")};
`;
