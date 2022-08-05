import React, { useCallback } from "react";

import Wrap from "../elements/Wrap";
import TogetherCard from "../components/TogetherCard";
import CommunityCard from "../components/CommunityCard";
import SetAddress from "../components/SetAddress";

// style
import styled from "styled-components";

// redux
import { useSelector, useDispatch } from "react-redux";
import { loadPostsDB as loadTogether } from "../redux/modules/recruitSlice";
import { loadPostsDB as loadCommunity } from "../redux/modules/communitySlice";

// route
import { useNavigate } from "react-router-dom";

const CommunityList = ( props ) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const type = props.type
  const [city, setCity] = React.useState("all");
  const [province, setProvince] = React.useState("all");
 
  const communityList = useSelector((state) => state.community.list);
  const togetherList = useSelector((state) => state.recruit.list);
  const isCommunityLastPg = useSelector((state) => state.community.isLast);
  const isRecruitLastPg = useSelector((state) => state.recruit.isLast);
  const isLastPg = type === 'community' ? isCommunityLastPg : isRecruitLastPg

  const listEndRef = React.useRef();
  const [page, setPage] = React.useState(-1);

    // 페이지인덱스넘버 바꾸기
    const loadinghandler = useCallback(
      (entries) => {
        if (entries[0].isIntersecting && !isLastPg) {
          setPage((page) => page + 1);
        }
      },
      [isLastPg]
    );

    // 리스트 끝 감지
    React.useEffect(() => {
      const observer = new IntersectionObserver(loadinghandler, { threshold: 0.5 });
      if (listEndRef.current) {
        observer.observe(listEndRef.current);
      }
      return () => {
        observer.disconnect();
      };
    }, [loadinghandler]);

      // 포스트 로딩
    React.useEffect(() => {
      if ( page >= 0 && !isLastPg ) {
        if (type === 'together') {
          const pageInfo = { page: page, provinceId: province, cityId: city };
          dispatch(loadTogether(pageInfo));
        } else if (type === 'community') {
          dispatch(loadCommunity(page));
        }
      } else {
        console.log("마지막 페이지");
      }
    }, [page, dispatch, isLastPg, type, city, province]);

    // 카테고리 이동
    const changeCategory = (address) => {
      window.scrollTo(0, 0);
      setPage(0)
      navigate(address)
    }

  return (
    <Wrap>
      <Header type={type}>
        <div id="together" onClick={() => changeCategory("/together")}>
          함께하개
        </div>
        <div id="community" onClick={() => changeCategory("/community")}>
          커뮤니티
        </div>
      </Header>

      {type === "together" ? (
        <ListOption>
          <SetAddress setCity={setCity} setProvince={setProvince} setPage={setPage} />
        </ListOption>
      ) : null}
 
      <InnerWrap type={type}>
        {type === "together"
          ? togetherList.map((item) => <TogetherCard key={item.boardMainId} data={item} />)
          : communityList.map((item) => <CommunityCard key={item.boardMainId} data={item} />)}
      </InnerWrap>

      <ScrollDetect ref={listEndRef} />
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
    border-bottom: 0.2rem solid #fff;
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
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
`;

const InnerWrap = styled.div`
  width: ${(props) => (props?.type === "together" ? "90%" : "100%")};
  margin: auto;
  display: flex;
  flex-direction: column;
  padding-top: ${(props) => (props?.type === "together" ? "12rem" : "6rem")};
`;


const ScrollDetect = styled.div`
  height: 10px;
`