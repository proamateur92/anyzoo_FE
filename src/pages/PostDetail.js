import React, {useEffect, useState} from "react";
import Wrap from "../elements/Wrap";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { removeDataDB } from "../redux/modules/postSlice";

import { IoMdMore } from "react-icons/io";
import { IoHeartOutline, IoChatbubbleOutline } from "react-icons/io5";

import EditBubble from "../elements/EditBubble";

const PostDetail = () => {
  const params = useParams(); 
  const [data, setData] = useState(); //Api에서 받은 데이터 변수 설정
  const dispatch = useDispatch() 
  const navigate = useNavigate();
  const [bubbleOn, setBubbleOn] = React.useState(false);
  const [testImg, setTestImg] = useState([{url:"https://img.animalplanet.co.kr/news/2020/07/15/700/e05t9x1o0e3trklpwrr3.jpg"}, {url:"https://cdn.mediaville.co.kr/news/photo/202104/496_554_4651.jpg"},{url:"https://img.khan.co.kr/news/2019/11/29/l_2019112901003607500286631.jpg"}])

  const menuOpen = () => {
    setBubbleOn(!bubbleOn);
  };

// axios에서 데이터를 받아오기
useEffect(() => {
  axios.get("http://43.200.52.184:8080/post/" + params.id)
    .then(response => {
      setData(response.data) //useState의 data에 넣어준다.
      console.log(response.data)
    })

 
}, []);
  
const deletePost = (e) => {
    e.preventDefault(); 
    dispatch(removeDataDB(params.id)) //removeDateDB에 id 전달해줌.
  }

  const clickHeart = () => {
    axios.post("http://43.200.52.184:8080/heart/" + data?.boardMainId)
      .then()
}

  

  return (
    <Wrap>
      <div>
        <Back onClick={() => { navigate("/post") }} src={require("../assets/images/back.png.png")} alt="" />
      </div>
      <All>
        <UserInfo>
          <User>
            <UserImg
              src="https://item.kakaocdn.net/do/d8b92364bb23fd5c3dcf4c08f6422d63617ea012db208c18f6e83b1a90a7baa7"
              alt=""
            />
            <UserName>{data?.userNickname}</UserName> 
          </User>
          <Jum>
            <JumMom>
              <IoMdMore id="optionMenu" onClick={menuOpen} />
              {bubbleOn ? <EditBubble contentsId={data?.postId} setBubbleOn={setBubbleOn} /> : null}
            </JumMom>
          </Jum>
        </UserInfo>
        <ImgBox>
          {testImg.map((v, i) => {
            return (
              <ImgCard >
                <MainImg src={v.url}/>
              </ImgCard>
            )
          })}
                
        </ImgBox>
        <Content>{data?.content}</Content>
        <Reactions>
        <span>
            <IoHeartOutline onClick={clickHeart} /> {data?.likeCnt}{" "}
        </span>
        <span>
          <IoChatbubbleOutline /> {data?.viewCnt}{" "}
        </span>
      </Reactions>
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

const JumMom = styled.div`
  position: relative;
  font-size: 30px;
`

const ImgBox = styled.div`
  display: flex;
  overflow: auto;
  scroll-snap-type: x mandatory;
`

const ImgCard = styled.div`
  flex:none;
  scroll-snap-align: start;
  width: 100%;
`

const MainImg = styled.img`
  padding: 10px;
  width: 90%;
  display: block;
  height: 90%;
`

const Content = styled.p`
  padding: 20px;
  margin-left: 10px;
`

const Reactions = styled.div`
  padding-top: 15px;
  border-top: 1px solid #eee;

  span {
    margin-right: 10px;
  }
`;



export default PostDetail;