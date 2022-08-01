// react
import React, { useRef, useState, useEffect } from "react";

// elements
import Wrap from "../elements/Wrap";

// style
import styled from "styled-components";

// redux
import { useDispatch } from "react-redux";

// postSlice
import { modifyDataDB } from "../redux/modules/recruitSlice";

// axios
import instance from "../shared/axios";

//router
import { useParams, useNavigate } from "react-router-dom";

const RecruitUpdate = () => {
  const numberRef = useRef();
  const dateRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [select, setSelect] = useState();

  const [date, setDate] = useState();
  // const [siGunGu, setSiGunGu] = useState();
  const [city, setCity] = useState();
  // const [dongEbMun, setDongEbMun] = useState();
  // const [province, setProvince] = useState();

  //수정할때 데이터 value 값으로 불러오기
  useEffect(() => {
    instance.get("/api/together/detail/" + params.id).then((response) => {
      setData(response.data);
      setSelect(response.data.limitPeople);
      console.log("뭐야", response.data);
    });
  }, [params.id]);

  // useEffect(() => {
  //   instance.get("/api/together/city/").then((response) => {
  //     setSiGunGu(response.data); //useState의 data에 넣어준다.
  //     console.log(response.data, "시군구");
  //   });
  // }, []);

  // const dongMyun = () => {
  //   instance.get("/api/together/province/" + city).then((response) => {
  //     setDongEbMun(response.data); //useState의 data에 넣어준다.
  //     console.log(response.data, "동면읍");
  //   });
  // };

  // 카테고리 값 select으로 넣기
  const numbers = () => {
    // setSelect(e.target.value);
    // console.log(e.target.value)
    let num = [];

    for (let i = 0; i <= 100; i++) {
      num.push(i);
    }

    return num;
  };

  // const gu = (e) => {
  //   console.log(e.target.value);
  //   setCity(e.target.value);
  // };

  const count = (e) => {
    setSelect(e.target.value);
    console.log(e.target.value);
  };

  const dates = (e) => {
    console.log(e.target.value);
    setDate(e.target.value);
  };

  // const dong = (e) => {
  //   setProvince(e.target.value);
  // };

  //data 설정해 reducer로 보내기(더하기)
  const updateRecruit = async (e) => {
    e.preventDefault();
    console.log(dateRef.current.value, numberRef.current.value);

    const Data = {
      title: titleRef.current.value,
      dday: dateRef.current.value,
      content: contentRef.current.value,
      limitPeople: numberRef.current.value,
    };

    const newData = {
      id: params.id,
      data: Data,
    };

    console.log(data);
    dispatch(modifyDataDB(newData));
  };

  return (
    <Wrap>
      <TitleBox>
        <h1>수정하기</h1>
      </TitleBox>
      <InputBox>
        <p>지역 설정</p>
        <Location>
          <input type="text" value={data?.cityName} />
          <input type="text" value={data?.provinceName} />
        </Location>

        <p>게시물 제목(10자 이내)</p>
        <input maxLength={10} ref={titleRef} type="text" defaultValue={data?.title} />
        <p>인원 설정</p>
        <People onClick={numbers} onChange={count} defaultValue={data?.limitPeople} ref={numberRef}>
          <option disabled value="none">
            인원수
          </option>

          {numbers().map((n) => {
            if (data?.limitPeople === n) {
              return (
                <option key={n} value={n} selected>
                  {n}
                </option>
              );
            } else {
              return (
                <option key={n} value={n}>
                  {n}
                </option>
              );
            }
          })}
        </People>
        <p>날짜 설정</p>
        <DatePut onChange={dates} type="datetime-local" ref={dateRef} defaultValue={data?.dday}></DatePut>
        <p>첨부 사진 보기(수정X)</p>
        <Preview>
          {data?.img.map((v, id) => {
            return (
              <div key={id}>
                <PreviewImg src={v.url} />
              </div>
            );
          })}
        </Preview>
        <p>게시글 내용(1000자이내)</p>
        <Content maxLength={1000} ref={contentRef} defaultValue={data?.contents} />
        <ButtonBox>
          <CancelBtn onClick={() => navigate("/post")}>취소</CancelBtn>
          <AddBtn onClick={updateRecruit}>수정하기</AddBtn>
        </ButtonBox>
      </InputBox>
    </Wrap>
  );
};

const TitleBox = styled.div`
  text-align: center;
  width: 100%;
  height: 6%;

  h1 {
    width: 100%;
    font-size: clamp(10px, 5.67vw, 20px);
    font-weight: bold;
    margin-top: 10%;
  }
`;

const InputBox = styled.div`
  width: 80%;
  height: 70vh;
  margin: 0 10% 0 10%;
  div {
    display: flex;
  }
  p {
    color: #000;
    font-size: clamp(8px, 3.67vw, 16px);
    opacity: 0.6;
    margin: 0.9375rem 0;
  }
  input {
    font-size: clamp(8px, 3.67vw, 16px);
    opacity: 0.3;
    padding: 0.1875rem;
    width: 100%;
    height: 6%;
    border-radius: 0.625rem;
    border: 1px solid black;
  }
`;
const People = styled.select`
  font-size: 1.2rem;
  opacity: 30%;
  padding: 0.1875rem;
  width: 100%;
  height: 6%;
  border-radius: 10px;
  margin: 0 3% 0 0;
`;

const Location = styled.div`
  font-size: 1.2rem;
  opacity: 100%;
  padding: 0.1875rem;
  width: 100%;
  height: 6%;
  border-radius: 0.625rem;
  margin: 0 3% 0 0;

  input {
    height: 100%;
    width: 48%;
    margin-right: 4%;
  }
`;

const DatePut = styled.input`
  font-size: 1.2rem;
  opacity: 20%;
  padding: 0.1875rem;
  width: 18.75rem;
  height: 6%;
  border-radius: 10px;
  width: 30%;
  margin: 0 3% 0 0;
`;

const Preview = styled.div`
  justify-content: center;
  display: flex;
  width: 100%;
  height: 15%;
  div {
    margin: 1%;
  }
  overflow: auto;
`;

const PreviewImg = styled.img`
  width: 68px;
  height: 68%;
  border-radius: 5px;
  margin-top: 5px;
`;

const Content = styled.textarea`
  border: none;
  outline: none;
  padding: 5%;
  width: 100%;
  height: 40%;
  margin: 0.3125rem 0 0;
  border-radius: 10px;
  background-color: #f8f8f8;
`;

const ButtonBox = styled.div`
  text-align: center;
  padding: 4% 0 4% 0;
  width: 100%;
  height: 30%;
  /* margin: 0 10% 0 10%; */
`;

const CancelBtn = styled.button`
  width: 46%;
  height: 28%;
  flex-grow: 0;

  border-radius: 10px;
  background-color: #f2f2f2;
`;
const AddBtn = styled.button`
  width: 46%;
  height: 28%;
  flex-grow: 0;
  margin-left: 7%;
  border-radius: 10px;
  background-color: #44dcd3;
`;

export default RecruitUpdate;
