// react
import React, { useRef, useState, useEffect } from "react";

// elements
import Wrap from "../elements/Wrap";

// style
import styled from "styled-components";

// redux
import { useDispatch } from "react-redux";

// postSlice
import { modifyDataDB } from "../redux/modules/postSlice";

// axios
import instance from "../shared/axios";

//router
import { useParams, useNavigate } from "react-router-dom";

const PostUpdate = () => {
  const selectRef = useRef();
  const contentRef = useRef();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [select, setSelect] = useState();
  const [showImages, setShowImages] = useState([]);
  const [getImages, setGetImages] = useState([]);

  //카테고리 값 select으로 넣기
  const category = (e) => {
    setSelect(e.target.value);
    console.log(e.target.value);
  };

  //수정할때 데이터 value 값으로 불러오기
  useEffect(() => {
    instance.get("/api/post/" + params.id).then((response) => {
      setData(response.data);

      console.log(response.data, "222");
    });
  }, [params.id]);

  //data 수정해 reducer로 보내기(수정하기)
  const updatePost = async (e) => {
    e.preventDefault();
    console.log(selectRef.current.value);

    const Data = {
      categoryName: selectRef.current.value,
      content: contentRef.current.value,
    };

    const newData = {
      id: params.id,
      data: Data,
    };

    console.log(newData);
    dispatch(modifyDataDB(newData));
  };

  const handelAddImg = (e) => {
    // console.log(e.target.files, "img")
    const imageLists = e.target.files;

    let imageUrlLists = [...showImages];

    let getImagesLists = [...getImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImgUrl = URL.createObjectURL(imageLists[i]);
      // console.log(currentImgUrl, "url")
      imageUrlLists.push(currentImgUrl);
      getImagesLists.push(imageLists[i]);
    }

    if (imageUrlLists.length > 5) {
      imageUrlLists = imageUrlLists(0, 5);
    }

    setShowImages(imageUrlLists);

    setGetImages(getImagesLists);
  };

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
    setGetImages(getImages.filter((_, index) => index !== id));
  };

  return (
    <Wrap>
      <TitleBox>
        <h1>수정하기</h1>
      </TitleBox>
      <InputBox>
        <p>카테고리</p>
        <select
          key={data?.postCategory}
          defaultValue={data?.postCategory}
          onChange={category}
          ref={selectRef}
        >
          <option disabled>== 카테고리 ==</option>
          <option value="PRETTY">이쁨</option>
          <option value="COOL">멋짐</option>
          <option value="CUTE">귀여움</option>
          <option value="COMIC">웃김</option>
        </select>
        <p>첨부 사진 보기(수정X)</p>
        <Preview>
          {data?.img.map((v) => {
            return (
              <div key={v.id}>
                <PreviewImg src={v.url} />
              </div>
            );
          })}
        </Preview>

        <p>게시글 내용</p>
        <Content
          maxLength={255}
          ref={contentRef}
          defaultValue={data?.contents}
        />
        <ButtonBox>
          <CancelBtn onClick={() => navigate("/post")}>취소</CancelBtn>
          <AddBtn onClick={updatePost}>수정하기</AddBtn>
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
    font-size: 1.65rem;
    font-weight: bold;
    margin-top: 10%;
  }
`;

const InputBox = styled.div`
  width: 80%;
  height: 70vh;
  margin: 6% 10% 0 10%;

  p {
    color: #000;
    font-size: 1.2rem;
    opacity: 0.5;
    margin: 15px 0;
  }

  input {
    font-size: 1.2rem;
    opacity: 20%;
    padding: 0.1875rem;
    width: 100%;
    height: 4%;
    border-radius: 10px;
    border: 1px solid black;
  }

  select {
    font-size: 1.2rem;
    opacity: 20%;
    padding: 0.1875rem;
    width: 18.75rem;
    height: 5%;
    border-radius: 10px;
    width: 50%;
  }
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
  width: 6.8rem;
  height: 6.8rem;
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
  border-radius: 0.625rem;
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

export default PostUpdate;
