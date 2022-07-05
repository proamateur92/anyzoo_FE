import Wrap from '../elements/Wrap';
import styled from 'styled-components';
import React, { useRef, useState,useEffect } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { addDataDB, modifyDataDB, removeDataDB} from '../redux/modules/postSlice';
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"




const PostUpdate = () => {
  const imgRef = useRef()
  const contentRef = useRef()
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [data, setData] = useState();
  const [select, setSelect] = useState()

 

 

  const category = (e) => {
    setSelect(e.target.value)
    console.log(e.target.value)
  }

  useEffect(() => {
  axios.get("http://localhost:5000/post/" + params.id)
    .then(response => {
      setData(response.data)
      console.log(response.data)
    })

 
}, []);
  
  const updatePost = (e) => {
    e.preventDefault();
    const data = {
      category: select,
      content: contentRef.current.value,
      img:["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe-mT5HNR1pmVQdZUZhnvBKX4sbhVnzda1kw&usqp=CAU"]
    }
    console.log(data)
    dispatch(modifyDataDB(params.id, data));
  }

  

  return (
    <Wrap>
      <TitleBox>
        <h1>수정하기</h1>
      </TitleBox>
      <InputBox>
        <select key={data?.category} defaultValue={data?.category} onChange={category}>
        <option value="PRETTY" >이쁨</option>
        <option value="COOL">멋짐</option>
        <option value="CUTE">귀여움</option>
        <option value="COMIC">웃김</option>
        </select>
        <div>
          <input type="file" ref={imgRef}/>
        </div>
      
      <p>content</p>
        <Content defaultValue={data?.content} ref={contentRef}/>
        <ButtonBox>
        <button onClick={updatePost} >수정하기</button>
        </ButtonBox>
        
      </InputBox>
    </Wrap>
  );
};

const TitleBox = styled.div`
  text-align: center;
  padding: 10px;

  h1{
    font-size: 30px;
  }
`

const InputBox = styled.div`
display: block;
  padding: 30px;
`
const Content = styled.textarea`
  
    width: 100%;
    height: 6.25em;
    border: solid black 1px;
    resize: none;
  
`

const ButtonBox = styled.div`
  text-align: center;
  padding: 20px;
`

export default PostUpdate;
