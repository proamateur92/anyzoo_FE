
import Wrap from '../elements/Wrap';
//style
import styled from 'styled-components';

//react 
import React, { useRef, useState } from 'react';

//redux
import { useDispatch } from 'react-redux/es/exports';
import { addDataDB, removeDataDB} from '../redux/modules/postSlice';

const PostWrite = () => {
  const imgRef = useRef()
  const contentRef = useRef()
  
  const dispatch = useDispatch()
  const [select, setSelect] = useState()

 

 
 // 카테고리 값 select으로 넣기
  const category = (e) => {
    setSelect(e.target.value)
    // console.log(e.target.value)
  }

  //data 설정해 reducer로 보내기(더하기)
  const addPost = (e) => {
    e.preventDefault();
    const data = {
      category: select,
      content: contentRef.current.value,
      imgUrl:["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe-mT5HNR1pmVQdZUZhnvBKX4sbhVnzda1kw&usqp=CAU"]
    }
    console.log(data)
    dispatch(addDataDB(data));
  }

  

  return (
    <Wrap>
      <TitleBox>
        <h1>자랑하기</h1>
      </TitleBox>
      <InputBox>
        <select onChange={category}>
        <option value="PRETTY" >이쁨</option>
        <option value="COOL">멋짐</option>
        <option value="CUTE">귀여움</option>
        <option value="COMIC">웃김</option>
        </select>
        <div>
          <input type="file" ref={imgRef}/>
        </div>
      
      <p>content</p>
        <Content ref={contentRef}/>
        <ButtonBox>
        <button onClick={addPost}>올리기</button>
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

export default PostWrite;
