
import Wrap from '../elements/Wrap';
//style
import styled from 'styled-components';

//react 
import React, { useRef, useState } from 'react';

//redux
import { useDispatch } from 'react-redux/es/exports';
import { addDataDB, removeDataDB} from '../redux/modules/postSlice';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostWrite = () => {
  const imgRef = useRef();
  const contentRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [select, setSelect] = useState();
  const [showImages, setShowImages] = useState([]);
  const [getImages, setGetImages] = useState([])

  
 
 // 카테고리 값 select으로 넣기
  const category = (e) => {
    setSelect(e.target.value)
    // console.log(e.target.value)
  }

  //data 설정해 reducer로 보내기(더하기)
  const addPost = async (e) => {
    e.preventDefault();
    console.log(getImages)
    const img = getImages
    const formData = new FormData();
    for (let i = 0; i < img.length; i++){
      formData.append("file", img[i])
    }
    
    const response = await axios.post("http://43.200.52.184:8080/image/post", {
      data: formData, headers: {
      'Content-type':'multipart/form-data'
      },
    })
    console.log(response)
    const data = {
      CategoryName: select,
      content: contentRef.current.value,
      postimages: response
    }
    console.log(data)
    dispatch(addDataDB(data));
  }

  const handelAddImg = (e) => {
    // console.log(e.target.files, "img")
    const imageLists = e.target.files;
    


    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++){
     
      const currentImgUrl = URL.createObjectURL(imageLists[i]);
      // console.log(currentImgUrl, "url")
      imageUrlLists.push(currentImgUrl)
    }
    
    if (imageUrlLists.length > 5) {
      imageUrlLists = imageUrlLists(0,5)
    }

    setShowImages(imageUrlLists)
    
    const getImagesLists = e.target.files;
    
    setGetImages(getImagesLists)

  }

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };
  


  return (
    <Wrap>
      <TitleBox>
        <h1 style={{ fontSize : "20px" }}>자랑하개</h1>
      </TitleBox>
      <InputBox>
        
        <p>카테고리</p>
        <select  onChange={category}>
        <option value="pretty" >이쁨</option>
        <option value="cool">멋짐</option>
        <option value="cute">귀여움</option>
        <option value="comic">웃김</option>
        </select>
        <p>게시글 제목</p>
        <Preview>
          {showImages&&showImages.map((image, id) => {
            return (
              <div key={id}>
                <PreviewImg src={image} />
                <DeleteImg onClick={() => handleDeleteImage(id)} >x</DeleteImg>
              </div>
            )
          })}
          {showImages.length === 5 ? null :
            <label onChange={handelAddImg}>
              
                <input type="file" id="input-file" multiple style={{ display: "none" }} /> 
              
            
            <PlusImgBox>
              <PlusImg><p>+</p></PlusImg>
            </PlusImgBox>
            </label>
          }
         
            
        </Preview>
      
      <p>게시글 내용</p>
        <Content ref={contentRef}/>
        <ButtonBox>
          <CancelBtn onClick={()=>navigate('/post')}>취소</CancelBtn>
          <AddBtn onClick={addPost}>작성하기</AddBtn>
        </ButtonBox>
      </InputBox>
      
    </Wrap>
  );
};

const TitleBox = styled.div`
  text-align: center;
   padding: 19px 150px 18px 151px;
  margin-top: 20px;

  h1{
    font-size: 20px;
    font-weight: bold;
  }
`


const InputBox = styled.div`
text-align: center;


  p{
    color: #000;
    font-size: 16px;
    opacity: 0.5;
    margin: 15px 0;
  }

  select{
    font-size: 16px;
    opacity: 20%;
    padding: 3px;
    width: 300px;
    height: 30px;
    border-radius: 10px;
  }
`
const ImgPut = styled.input`
  margin-top: 5px;
`

const Preview = styled.div`
justify-content: center;
  display: flex;
`

const PreviewImg = styled.img`
 width: 68px;
 height: 68px;
 border-radius: 5px;
 margin-top: 10px;
`

const PlusImgBox = styled.div`
display: flex;
justify-content: center;
  width: 68px;
  height: 68px;
  margin-top: 11px;
  /* background-color: aqua; */
`

const PlusImg = styled.div`
  border: 2px solid #000;
  opacity: 0.3;
  width: 20px;
  height: 20px;
  margin: auto;
  margin-top: 20px;
  border-radius: 20px;
  padding: 2px;
  
  p{
    color: black;
    font-weight: bold;
    font-size: 25px;
    margin-top: -5px;
  }
`

const DeleteImg = styled.button`
  background-color: transparent;
  color: gray;
  left: 2px;
`

const Content = styled.textarea`
  border: none;
  width: 300px;
  height: 380px;
  margin: 5px 0 0;
  border-radius: 10px;
  background-color: #f8f8f8;
  
`

const ButtonBox = styled.div`
  text-align: center;
  padding: 20px;
`

const CancelBtn = styled.button`
  width: 130px;
  height: 50px;
  flex-grow: 0;
  margin: 0 20px 0 0;
  padding: 16px 51px 15px 49px;
  border-radius: 10px;
  background-color: #f2f2f2;
`
const AddBtn = styled.button`
  width: 130px;
  height: 50px;
  flex-grow: 0;
  margin: 0 0 0 20px;
  padding: 16px 36px 15px 35px;
  border-radius: 10px;
  background-color: #44dcd3;
`

export default PostWrite;
