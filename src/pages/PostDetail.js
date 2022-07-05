import Wrap from "../elements/Wrap";
import styled from "styled-components";

const PostDetail = () => {
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
            <UserName>name</UserName>
          </User>

          <Jum>
            <JumImg src={require("../images/jum.png.png")} />
          </Jum>
        </UserInfo>
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
`;

const User = styled.div`
  display: flex;
`;

const UserImg = styled.img`
  width: 50px;
  height: 50px;
`;

const UserName = styled.span`
  font-size: 30px;
  margin-top: 10px;
`;

const JumImg = styled.img`
  width: 10px;
  height: 35px;
  margin: 10px;
`;

const Jum = style.div`
  
`



export default PostDetail;