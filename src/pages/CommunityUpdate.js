// react
import React, { useRef, useState, useEffect } from "react";

// elements
import Wrap from "../elements/Wrap";

// style
import styled from "styled-components";

// redux
import { useDispatch } from "react-redux";

// postSlice
import { modifyDataDB } from "../redux/modules/communitySlice";

// axios
import instance from "../shared/axios";

//router
import { useParams, useNavigate } from "react-router-dom";

const CommunityUpdate = () => {
  const contentRef = useRef();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState();

  //수정할때 데이터 value 값으로 불러오기
  useEffect(() => {
    instance.get("/api/community/" + params.id).then((response) => {
      setData(response.data);
    });
  }, [params.id]);

  //data 수정해 reducer로 보내기(수정하기)
  const updateCommunity = async (e) => {
    e.preventDefault();

    const Data = {
      content: contentRef.current.value,
    };

    const newData = {
      id: params.id,
      data: Data,
    };

    console.log(newData);
    dispatch(modifyDataDB(newData));
  };

  return (
    <Wrap>
      <TitleBox>
        <h1>수정하기</h1>
      </TitleBox>
      <InputBox>
        <p>첨부 사진 보기</p>
        <Preview>
          {data?.img.map((v, id) => {
            return (
              <div key={id}>
                <PreviewImg src={v.url} />
              </div>
            );
          })}
        </Preview>

        <p>게시글 내용</p>
        <Content ref={contentRef} defaultValue={data?.contents} />
        <ButtonBox>
          <CancelBtn onClick={() => navigate("/community")}>취소</CancelBtn>
          <AddBtn onClick={updateCommunity}>수정하기</AddBtn>
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
  margin: 10% 10% 0 10%;

  p {
    color: #000;
    font-size: clamp(8px, 2.67vw, 16px);
    opacity: 0.5;
    margin: 15px 0;
  }

  input {
    font-size: 16px;
    opacity: 20%;
    padding: 3px;
    width: 100%;
    height: 4%;
    border-radius: 10px;
    border: 1px solid black;
  }
`;

const Preview = styled.div`
  justify-content: center;
  display: flex;
  height: 11%;
`;

const PreviewImg = styled.img`
  width: 68px;
  height: 100%;
  border-radius: 5px;
  margin-top: 1%;
`;

const Content = styled.textarea`
  border: none;
  width: 100%;
  height: 40%;
  margin: 5px 0 0;
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

export default CommunityUpdate;
