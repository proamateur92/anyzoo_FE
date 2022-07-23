import React, { useCallback } from "react";

// element
import Wrap from "../elements/Wrap";

// components
import PostCard from "../components/PostCard";
import SubHeader from "../elements/SubHeader";

// element
import Bubble from "../elements/Bubble";

// redux
import { useSelector, useDispatch } from "react-redux";
import { loadPostsDB } from "../redux/modules/postSlice";

//style
import styled from "styled-components";

// icons
import { FiChevronDown, FiSettings } from "react-icons/fi";

const Post = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.list);
  const isLastPg = useSelector((state) => state.post.last);
  const postEndRef = React.useRef();
  const [page, setPage] = React.useState(-1);
  const [category, setCategory] = React.useState("all");
  const [sort, setSort] = React.useState("");
  const [bubbleOn, setBubbleOn] = React.useState(false);

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
    if (postEndRef.current) {
      observer.observe(postEndRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [loadinghandler]);

  // 포스트 로딩
  React.useEffect(() => {
    if (page >= 0 && !isLastPg) {
      const pageInfo = { page: page, sorting: category + sort };
      dispatch(loadPostsDB(pageInfo));
      console.log("새 페이지 로딩");
    } else {
      console.log("마지막 페이지");
    }
  }, [page, dispatch, isLastPg, category, sort]);

  // 카테고리 변경
  const changeCategory = (e) => {
    const pageInfo = { page: 0, sorting: e.target.value + sort };
    dispatch(loadPostsDB(pageInfo));
    setCategory(e.target.value);
    setPage(0);
  };

  const changeSorting = (sortingOpt) => {
    const pageInfo = { page: 0, sorting: category + sortingOpt };
    dispatch(loadPostsDB(pageInfo));
    setSort(sortingOpt);
    setPage(0);
    setBubbleOn(!bubbleOn)
  };

  return (
    <Wrap>
      <SubHeader title={"자랑하개"}>
        <SelectCategory>
          <select onChange={(e) => changeCategory(e)}>
            <option value={"all"}>전체보기</option>
            <option value={"cute"}>귀여움</option>
            <option value={"pretty"}>예쁨</option>
            <option value={"comic"}>웃김</option>
            <option value={"cool"}>잘생김</option>
          </select>
          <span id="selectArrow">
            <FiChevronDown />
          </span>

          <FiSettings id="settings" onClick={() => setBubbleOn(!bubbleOn)} />

          {bubbleOn ? (
            <Bubble setBubbleOn={setBubbleOn}>
              <p onClick={() => changeSorting("")}>최신순</p>
              <p onClick={() => changeSorting("like")}>추천순</p>
            </Bubble>
          ) : null}
        </SelectCategory>
      </SubHeader>

      {posts.map((post) => (
        <PostCard key={post.boardMainId} data={post} />
      ))}
      <div ref={postEndRef} />
    </Wrap>
  );
};

export default Post;

const SelectCategory = styled.div`
  margin-right: 1.5%;
  height: 49%;
  width: 48%;
  min-width: 11rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  select {
    height: 100%;
    width: 78%;
    border-radius: 1rem;
    outline: none;
    border: solid 1px rgba(0, 0, 0, 0.3);
    padding: 0 1.3rem;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    font-size: 1.6rem;
    color: #bcbcbc;
  }

  #selectArrow {
    margin-left: -28%;
    color: #bcbcbc;
  }

  #settings {
    cursor: pointer;
    font-size: 2.2rem;
  }
`;
