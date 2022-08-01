// react
import React from "react";

// style
import styled from "styled-components";

// axios
import instance from "../shared/axios";

// router
import { useNavigate } from 'react-router-dom';

const WeeklyRank = () => {
  const navigate = useNavigate();
  const [category, setCategory] = React.useState("cute");
  const [list, setList] = React.useState([]);
  const [mostVotes, setMostVotes] = React.useState(0);

  React.useEffect(() => {
    changeCategory(category);
  }, [category]);

  const changeCategory = async (categoryName) => {
    const response = await instance.get("/api/rank/week/" + categoryName).catch((err) => console.log(err));
    setList(response.data);
    setMostVotes(response.data[0]?.likeCnt);
    setCategory(categoryName);
  };

  return (
    <WeeklyRankWrap>
      <CategoryTitle category={category}>
        <span id="cute" onClick={() => changeCategory("cute")}>
          귀여움
        </span>

        <span id="cool" onClick={() => changeCategory("cool")}>
          멋짐
        </span>

        <span id="pretty" onClick={() => changeCategory("pretty")}>
          예쁨
        </span>

        <span id="comic" onClick={() => changeCategory("comic")}>
          웃김
        </span>
      </CategoryTitle>

      {list.map((ranker, i) => (
        <CategoryRanking key={ranker ? ranker.boardMainId : i}>
          <CateRankerPic img={ranker?.img[0]?.url} onClick={()=> navigate('/post/detail/'+ ranker.boardMainId)}/>
          <RankerInfo onClick={()=> navigate('/post/detail/'+ ranker.boardMainId)}>
            <span>
              <Rank rank={i+1}> {i + 1}위 </Rank>
              {ranker?.nickname}
            </span> 
            <VoteBar votes={ranker?.likeCnt} mostVotes={mostVotes}>
              {ranker?.likeCnt ? ranker?.likeCnt.toLocaleString() : '- '}표
            </VoteBar>
          </RankerInfo>
        </CategoryRanking>
      ))}
    </WeeklyRankWrap>
  );
};

export default WeeklyRank;

const WeeklyRankWrap = styled.div`
margin-bottom: 2rem;
`;

const CategoryTitle = styled.div`
  display: flex;
  justify-content: space-between;
  height: 6rem;
  white-space: nowrap;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
    height: 100%;
    font-size: 1.8rem;
    font-weight: bolder;
    color: #c2c2c2;
    cursor: pointer;
  }

  #${(props) => props.category} {
    border-bottom: 0.2rem solid #44dcd3;
    color: #333;
  }
`;

const CategoryRanking = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid #ddd;
  padding: 1.5rem 5.33%;
`;

const CateRankerPic = styled.div`
  width: 13.3%;
  padding-top: 13.3%;
  border-radius: 80px;
  border: 1px solid #eee;

  background: ${(props) => (props.img ? "url(" + props.img + ")" : "#ddd")};
  background-size: cover;
  background-position: center;
  cursor:pointer;
`;

const RankerInfo = styled.div`
  display: flex;
  margin-left: 2rem;
  flex-direction: column;
  width: 76%;
  gap: 0.5rem;
  cursor:pointer;
  
  span {
    font-size: 1.6rem;
    display:flex;
  }
`

const Rank = styled.h5`
 font-size: 1.8rem;
 margin-right: 0.5rem;
 font-weight: bold;
 color: ${(props) => props.rank === 1 ? '#b6762c' : props.rank === 2 ? '#a4adb1' : '#937d69' }
`

const VoteBar = styled.div`
  height: 2rem;
  background: #44dcd3;
  border-radius: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0px 1rem;
  width: ${(props) => ( props.votes / props.mostVotes) * 100}%;
  min-width: 15%;
  font-size: 1.4rem;
  white-space: nowrap;
  color: #fff;
`;
