import Wrap from "../elements/Wrap";
//style
import styled from "styled-components";

//react
import React, { useEffect, useRef, useState } from "react";

//redux
import { useDispatch } from "react-redux/es/exports";
import { addDataDB } from "../redux/modules/recruitSlice";
import { useNavigate } from "react-router-dom";
import instance from "../shared/axios";

const RecruitWrite = () => {
  const contentRef = useRef();
  const titleRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [select, setSelect] = useState();
  const [showImages, setShowImages] = useState([]);
  const [getImages, setGetImages] = useState([]);
  const [date, setDate] = useState();
  const [siGunGu, setSiGunGu] = useState();
  const [city, setCity] = useState();
  const [dongEbMun, setDongEbMun] = useState();
  const [province, setProvince] = useState();

  useEffect(() => {
    instance.get("/api/together/city/").then((response) => {
      setSiGunGu(response.data); //useState의 data에 넣어준다.
    });
  }, []);

  const dongMyun = () => {
    instance.get("/api/together/province/" + city).then((response) => {
      setDongEbMun(response.data); //useState의 data에 넣어준다.
      console.log(response.data, "동면읍");
    });
  };

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

  const gu = (e) => {
    console.log(e.target.value);
    setCity(e.target.value);
  };

  const count = (e) => {
    setSelect(e.target.value);
    console.log(e.target.value);
  };

  const dates = (e) => {
    console.log(e.target.value);
    setDate(e.target.value);
  };

  const dong = (e) => {
    console.log(e.target.value);
    setProvince(e.target.value);
  };

  //data 설정해 reducer로 보내기(더하기)
  const addPost = async (e) => {
    window.URL.revokeObjectURL(showImages);
    e.preventDefault();
    console.log(getImages);
    let img = getImages;
    if (
      !titleRef.current.value ||
      !contentRef.current.value ||
      !select ||
      !date ||
      !province
    ) {
      window.alert("빈칸을 채워주세요");
    } else {
      if (img.length > 0) {
        const formData = new FormData();

        for (let i = 0; i < img.length; i++) {
          //  console.log(img[i])
          formData.append("file", img[i]);
          // files.push(img[i])
        }
        // console.log(img[i], "뭐냐") console.log(files) formData.append("file", img)

        const response = await instance.post("/api/together/image", formData);
        console.log(response.data);

        const data = {
          title: titleRef.current.value,
          content: contentRef.current.value,
          limitPeople: select,
          dday: date,
          provinceId: province,
          togetherImages: response.data,
        };

        console.log(data);
        dispatch(addDataDB(data));
      } else {
        const data = {
          title: titleRef.current.value,
          dday: date,
          content: contentRef.current.value,
          togetherImages: null,
          limitPeople: select,
          provinceId: province,
        };

        console.log(data);
        dispatch(addDataDB(data));
      }
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
        <h1>함께하개</h1>
      </TitleBox>
      <InputBox>
        <p>지역 설정</p>
        <Location onChange={gu} onClick={dongMyun} defaultValue="none">
          <option value="none" disabled>
            시/군/구
          </option>
          {siGunGu?.map((v) => {
            return (
              <option key={v.cityId} value={v.cityId}>
                {v.cityName}
              </option>
            );
          })}
        </Location>
        <Location onChange={dong} defaultValue="none">
          <option disabled value="none">
            동/읍/면
          </option>
          {dongEbMun?.map((v) => {
            return (
              <option key={v.provinceId} value={v.provinceId}>
                {v.provinceName}
              </option>
            );
          })}
        </Location>
        <p>게시물 제목</p>
        <input maxLength={10} ref={titleRef} type="text" />
        <p>인원 설정</p>
        <People onClick={numbers} onChange={count} defaultValue="none">
          <option disabled value="none">
            인원수
          </option>

          {numbers().map((n) => {
            return (
              <option key={n} value={n}>
                {n}
              </option>
            );
          })}
        </People>
        <p>날짜 설정</p>
        <DatePut onChange={dates} type="datetime-local"></DatePut>
        <p>사진 첨부 (최대 5장, 선택사항)</p>

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
        <Content maxLength={255} ref={contentRef} />
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
    margin: 0.9375rem 0;
  }
  input {
    font-size: 1.2rem;
    opacity: 20%;
    padding: 0.1875rem;
    width: 100%;
    height: 6%;
    border-radius: 10px;
    border: 1px solid black;
  }
`;
const People = styled.select`
  font-size: 1.2rem;
  opacity: 20%;
  padding: 0.1875rem;
  width: 100%;
  height: 6%;
  border-radius: 10px;
  margin: 0 3% 0 0;
`;

const Location = styled.select`
  font-size: 1.2rem;
  opacity: 20%;
  padding: 0.1875rem;
  width: 47%;
  height: 6%;
  border-radius: 10px;
  margin: 0 3% 0 0;
`;

const DatePut = styled.input`
  font-size: clamp(8px, 3.67vw, 16px);
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
  height: 80px;
  overflow: auto;
`;

const PreviewImg = styled.img`
  width: 68px;
  height: 68%;
  border-radius: 5px;
  margin-top: 5px;
`;

const PlusImgBox = styled.div`
  display: flex;
  justify-content: center;
  width: 68px;
  margin-top: 0.6875rem;
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
    margin-top: -5px;
  }
`;

const DeleteImg = styled.button`
  background-color: transparent;
  color: gray;
  left: 0.125rem;
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

export default RecruitWrite;
