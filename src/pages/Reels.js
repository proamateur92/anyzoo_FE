import React from "react";

import Wrap from "../elements/Wrap";

// style
import styled from "styled-components";

// icons
import { IoHeartOutline, IoHeart, IoChatbubbleOutline } from "react-icons/io5";
import { FiAlignJustify } from "react-icons/fi";


const Reels = (props) => {
  const [isLiked, setIsLiked] = React.useState(false);

  return (
    <Wrap>
      <Cover>
        <InfoBox>
          <UserInfo>
            <UserProfile img={false} />
            <p>닉네임</p>
          </UserInfo>
            <Texts> Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Texts>

        <More>
          <Reactions>
            <span className="like" onClick={() => setIsLiked(!isLiked)}>
              {isLiked ? <IoHeartOutline /> : <IoHeart className="filled" />}
              999
            </span>

            <span>
              <IoChatbubbleOutline /> 999
            </span>
          </Reactions>

          <FiAlignJustify id="seeMore"/>

        </More>


        </InfoBox>
      </Cover>
    </Wrap>
  );
};

export default Reels;

const Cover = styled.div`
  width: 100%;
  min-height: 92vh;
  margin-bottom: -2.3vh;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  overflow: hidden;
  position: relative;
`;

const InfoBox = styled.div`
  position: absolute;
  width: 100%;
  bottom: 2.3%;
  left: 0;
  padding: 8%;
`;

const UserInfo = styled.span`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  width: 95%;
  flex-shrink: 0;

  p {
    color: #fff;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
  }
`;

const UserProfile = styled.span`
  width: 3rem;
  padding-top: 3rem;
  border-radius: 100px;
  margin-right: 1rem;
  background: ${(props) => (props.img ? `url(${props.img})` : "#ddd")};
  background-size: cover;
  background-position: center;
`;

const Texts = styled.p`
  width: 72.7%;
  font-size: 1.2rem;
  color: #fff;
  margin-bottom: 1.8rem;


  text-overflow: ellipsis;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const More = styled.div`
  display: flex;
  justify-content: space-between;
  color: #fff;

  #seeMore{
    font-size: 2.4rem;
  }

`

const Reactions = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;

  span {
    margin-right: 1.1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .like {
    cursor: pointer;
  }

  .filled {
    color: red;
  }
`;
