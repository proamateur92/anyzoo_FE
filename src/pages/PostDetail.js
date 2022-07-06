import React, {useEffect, useState} from "react";
import Wrap from "../elements/Wrap";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { removeDataDB } from "../redux/modules/postSlice";

const PostDetail = () => {
  const params = useParams(); 
  const [data, setData] = useState(); //Api에서 받은 데이터 변수 설정
  const dispatch = useDispatch() 
  const navigate = useNavigate();

// axios에서 데이터를 받아오는 이벤트 훅
useEffect(() => {
  axios.get("http://localhost:5000/post/" + params.id)
    .then(response => {
      setData(response.data) //useState의 data에 넣어준다.
      console.log(response.data)
    })

 
}, []);
  
const deletePost = (e) => {
    e.preventDefault(); 
    dispatch(removeDataDB(params.id)) //removeDateDB에 id 전달해줌.
  }

  return (
    <Wrap>
      <div>
        <Back src={require("../images/back.png.png")} alt="" />
      </div>
      <All>
        <UserInfo>
          <User>
            <UserImg
              src="https://item.kakaocdn.net/do/d8b92364bb23fd5c3dcf4c08f6422d63617ea012db208c18f6e83b1a90a7baa7"
              alt=""
            />
            <UserName>{data?.username}</UserName> 
          </User>
          <Jum>
            <JumImg src={require("../images/jum.png.png")} />
          </Jum>
        </UserInfo>
        <ImgBox>
                <MainImg src={data?.imgUrl[0]}/>
        </ImgBox>
        <Content>{data?.content}</Content>
        <button onClick={() =>navigate('/post/update/' + params.id)}>수정</button>
        <button onClick={deletePost}>삭제</button>
      </All>
    </Wrap>
  );
};

const Back = styled.img`
  height: 30px;
  padding: 20px;
`;

const All = styled.div`
  padding: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const User = styled.div`
  display: flex;
`;

const UserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  border: solid 1px black;
`;

const UserName = styled.span`
  font-size: 30px;
  margin-top: 10px;
  margin: 10px;
`;

const JumImg = styled.img`
  width: 10px;
  height: 35px;
  margin: 10px;
`;

const Jum = styled.div`
  
`

const ImgBox = styled.div`
  text-align: center;
`

const MainImg = styled.img`
  padding: 10px;
  width: 90%;
`

const Content = styled.p`
  padding: 20px;
  margin-left: 10px;
`



export default PostDetail;