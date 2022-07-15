import Wrap from '../elements/Wrap';
//style
import styled from 'styled-components';

//react
import React, { useRef, useState, useEffect } from 'react';

//redux
import { useDispatch } from 'react-redux/es/exports';
import { addDataDB, modifyDataDB, removeDataDB } from '../redux/modules/postSlice';

//axios
import axios from "axios"

//router
import { useParams, useNavigate } from "react-router-dom"
import instance from '../shared/axios';




const PostUpdate = () => {
  const imgRef = useRef()
  const contentRef = useRef()
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [data, setData] = useState();
  const [select, setSelect] = useState()
 const [showImages, setShowImages] = useState([]);
  const [getImages, setGetImages] = useState([])
 

 
  //카테고리 값 select으로 넣기
  const category = (e) => {
    setSelect(e.target.value)
    console.log(e.target.value)
  }


  //수정할때 데이터 value 값으로 불러오기
  useEffect(() => {
  instance.get("/api/post/" + params.id)
    .then(response => {
      setData(response.data)
      console.log(response.data)
    })

 
}, []);
  
//data 수정해 reducer로 보내기(수정하기)
  const updatePost = async (e) => {
    window.URL.revokeObjectURL(showImages)
    e.preventDefault();
    console.log(getImages)
    let img = getImages
   
    const formData = new FormData();
   
    
    for (let i = 0; i < img.length; i++){
       formData.append("file", img[i]);   
    }
    
     const response = await instance.post("/api/post/image", 
      formData
     )
    console.log(response.data)
    const Data = {
      categoryName: select,
      content: contentRef.current.value,
      postImages: response.data
    }

    const newData = {
      id: params.id,
      data : Data
    }
  
    console.log(newData)
    dispatch(modifyDataDB( newData ));
   
  }

   const handelAddImg = (e) => {
    // console.log(e.target.files, "img")
    const imageLists = e.target.files;

    let imageUrlLists = [...showImages];

    let getImagesLists = [...getImages]

    for (let i = 0; i < imageLists.length; i++){
     
      const currentImgUrl = URL.createObjectURL(imageLists[i]);
      // console.log(currentImgUrl, "url")
      imageUrlLists.push(currentImgUrl)
      getImagesLists.push(imageLists[i])
    }
    
    if (imageUrlLists.length > 5) {
      imageUrlLists = imageUrlLists(0,5)
    }

    setShowImages(imageUrlLists)
    
   

   
    
    setGetImages(getImagesLists)

  }

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
    setGetImages(getImages.filter((_, index) => index !== id))
  };
  

  return (
    <Wrap>
      <TitleBox>
        <h1>수정하기</h1>
      </TitleBox>
      <InputBox>
        <p>카테고리</p>
        <select key={data?.postCategory} defaultValue={data?.postCategory} onChange={category}>
        <option value="PRETTY" >이쁨</option>
        <option value="COOL">멋짐</option>
        <option value="CUTE">귀여움</option>
        <option value="COMIC">웃김</option>
        </select>
        <p>사진 첨부 (최대 5장)</p>
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
        <Content ref={contentRef} defaultValue={data?.contents}/>
        <ButtonBox>
          <CancelBtn onClick={()=>navigate('/post')}>취소</CancelBtn>
          <AddBtn onClick={updatePost}>수정하기</AddBtn>
        </ButtonBox>
        
      </InputBox>
    </Wrap>
  );
};

const TitleBox = styled.div `
text-align: center;
  width: 100%;
  height: 6%;
 
  h1{
    width: 100%;
    font-size: 20px;
    font-weight: bold;
    margin-top: 10%;
  }
`

const InputBox = styled.div `
width: 80%;
height: 650px;
overflow: auto;
margin: 0 10% 0 10%;


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
    height: 5%;
    border-radius: 10px;
    width: 50%;
    
  }
`

const ImgBox = styled.div `
    width:100%;
    height: 18%;
`



const Preview = styled.div `
justify-content: center;
  display: flex;
  height: 11%;
`

const PreviewImg = styled.img `
 width: 68px;
 height: 100%;
 border-radius: 5px;
 margin-top: 1%;
`

const PlusImgBox = styled.div `
display: flex;
justify-content: center;
  width: 68px;
  height: 100%;
  /* margin-top: 11px; */
  /* background-color: aqua; */
`

const PlusImg = styled.div `
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
    margin-left: 1px;
  }
`

const DeleteImg = styled.button `
  background-color: transparent;
  color: gray;
  left: 2px;
`

const Content = styled.textarea `
  border: none;
  width: 100%;
  height: 40%;
  margin: 5px 0 0;
  border-radius: 10px;
  background-color: #f8f8f8;
  
`

const ButtonBox = styled.div `
  text-align: center;
  padding: 5% 0 5% 0;
  width: 100%;
  height: 30%;
  /* margin: 0 10% 0 10%; */
`

const CancelBtn = styled.button `
  width: 46%;
  height: 28%;
  flex-grow: 0;
  
  
  border-radius: 10px;
  background-color: #f2f2f2;
`
const AddBtn = styled.button `
  width: 46%;
  height: 28%;
  flex-grow: 0;
  margin-left: 7%;
  border-radius: 10px;
  background-color: #44dcd3;
`


export default PostUpdate;
