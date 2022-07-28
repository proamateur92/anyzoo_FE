import Wrap from "../elements/Wrap";
//style
import styled from "styled-components";

//react
import React, { useRef, useState } from "react";

//redux
import { useDispatch } from "react-redux/es/exports";
import { addDataDB, removeDataDB } from "../redux/modules/communitySlice";
import { useNavigate } from "react-router-dom";
import instance from "../shared/axios";

const CommunityWrite = () => {
  //   const titleRef = useRef();
  const imgRef = useRef();
  const contentRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [select, setSelect] = useState();
  const [showImages, setShowImages] = useState([]);
  const [getImages, setGetImages] = useState([]);
  const [saveImage, setSaveImage] = useState();

  //data 설정해 reducer로 보내기(더하기)
  const addPost = async (e) => {
    window.URL.revokeObjectURL(showImages);
    e.preventDefault();
    console.log(getImages);
    let img = getImages;

    if (img.length > 0) {
      const formData = new FormData();

      for (let i = 0; i < img.length; i++) {
        //  console.log(img[i])
        formData.append("file", img[i]);
        // files.push(img[i])
      }
      // console.log(img[i], "뭐냐") console.log(files) formData.append("file", img)

      const response = await instance.post("/api/community/image", formData);
      console.log(response.data);
      setSaveImage(response.data);

      const data = {
        // title: titleRef.current.value,
        content: contentRef.current.value,
        communityImages: response.data,
      };

      console.log(data);
      dispatch(addDataDB(data));
    } else {
      const data = {
        // title: titleRef.current.value,
        content: contentRef.current.value,
        communityImages: null,
      };

      console.log(data);
      dispatch(addDataDB(data));
    }
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
        <h1>커뮤니티</h1>
      </TitleBox>
      <InputBox>
        {/* <p>게시글 제목</p>
        <input type="text" ref={titleRef} /> */}
        <p>사진 첨부 (최대 5장)</p>

        <Preview>
          {showImages &&
            showImages.map((image, id) => {
              return (
                <div key={id}>
                  <PreviewImg src={image} />
                  <DeleteImg onClick={() => handleDeleteImage(id)}>x</DeleteImg>
                </div>
              );
            })}
          {showImages.length === 5 ? null : (
            <label onChange={handelAddImg}>
              <input
                type="file"
                id="input-file"
                multiple="multiple"
                style={{
                  display: "none",
                }}
              />

              <PlusImgBox>
                <PlusImg>
                  <p>+</p>
                </PlusImg>
              </PlusImgBox>
            </label>
          )}
        </Preview>

        <p>게시글 내용</p>
        <Content ref={contentRef} />
        <ButtonBox>
          <CancelBtn onClick={() => navigate("/post")}>취소</CancelBtn>
          <AddBtn onClick={addPost}>작성하기</AddBtn>
        </ButtonBox>
      </InputBox>
    </Wrap>
  );
};

const TitleBox = styled.div`
  text-align: center;
  width: 100%;
  height: 20%;

  h1 {
    width: 100%;
    font-size: 1.65rem;
    font-weight: bold;
    margin-top: 12%;
  }
`;

const InputBox = styled.div`
  width: 80%;
  height: 70vh;
  margin: 0 10% 0 10%;
  p {
    color: #000;
    font-size: 1.2rem;
    opacity: 0.5;
    /* margin: 15px 0; */
    margin: 5% 0 3% 0;
  }
  input {
    font-size: 1.2rem;
    opacity: 20%;
    padding: 0.1875rem;
    width: 100%;
    height: 5%;
    border-radius: 10px;
    border: 1px solid black;
  }
`;

const Preview = styled.div`
  justify-content: center;
  display: flex;
  width: 100%;
  height: 80px;
  overflow: auto;
`;

const PreviewImg = styled.img`
  width: 68px;
  height: 68%;
  border-radius: 5px;
  margin-top: 0.625rem;
`;

const PlusImgBox = styled.div`
  display: flex;
  justify-content: center;
  width: 68px;
  height: 68px;
  margin-top: 11px;
  /* background-color: aqua; */
`;

const PlusImg = styled.div`
  border: 2px solid #000;
  opacity: 0.3;
  width: 25px;
  height: 25px;
  margin-top: 20px;
  border-radius: 20px;
  padding: 2px;
  text-align: center;

  p {
    color: black;
    font-weight: bold;
    font-size: 25px;
    margin: auto;
    margin-top: -7px;
  }
`;

const DeleteImg = styled.button`
  background-color: transparent;
  color: gray;
  display: inline-block;
  margin-bottom: 0.0625rem;
`;

const Content = styled.textarea`
  border: none;
  width: 100%;
  height: 50%;
  margin: 0.3125rem 0 0;
  border-radius: 10px;
  background-color: #f8f8f8;
`;

const ButtonBox = styled.div`
  text-align: center;
  padding: 4% 0 4% 0;
  width: 100%;
  height: 30%;
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

export default CommunityWrite;
