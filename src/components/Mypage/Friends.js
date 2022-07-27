// react
import { useState, useEffect, useCallback } from 'react';

// style
import styled from 'styled-components';

// axios
import instance from '../../shared/axios';

// redux
import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

// sweetalert
import Swal from 'sweetalert2';

const Friends = ({ nickname }) => {
  const userInfo = useSelector((state) => state.user.info);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [chooseTap, setChooseTap] = useState('following');
  const [friendList, setFriendList] = useState({ following: [], follower: [], isShow: false });

  // tap 전환 여부
  const handleChangeTap = (type) => {
    setChooseTap(type);
  };

  const deleteFollowing = async (nickname) => {
    try {
      const response = await instance.post(`/api/follow/${nickname}`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 팔로잉 해제
  const handleFriend = (event, nickname) => {
    event.stopPropagation();
    console.log('팔로잉 취소');
    Swal.fire({
      title: `${nickname}님의 팔로잉을 해제합니다.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '팔로잉 해제',
      cancelButtonText: '취소',
      confirmButtonColor: 'red',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFollowing(nickname);
      }
    });
  };

  let content = '';

  if (chooseTap === 'following') {
    // 팔로잉일때
    content = (
      <FriendList>
        {!!friendList.following.length &&
          friendList.following.map((friend) => (
            <div
              className='friend_row'
              key={friend.nickname}
              onClick={() => {
                navigate(`/mypage/${friend.nickname}`);
              }}
            >
              <div className='friend_profile'>
                <img src={friend.userProfileImg} alt='유저 이미지' />
                <span>{friend.nickname}</span>
              </div>
              {userInfo.nickname === nickname && (
                <DeleteBtn onClick={(event) => handleFriend(event, friend.nickname)}>해제</DeleteBtn>
              )}
            </div>
          ))}
        {!friendList.following.length && <div className='friend_no'>팔로잉한 친구가 없어요.</div>}
      </FriendList>
    );
  } else if (chooseTap === 'follower') {
    // 팔로워일때
    content = (
      <FriendList>
        {!!friendList.follower.length &&
          friendList.follower.map((friend) => (
            <div className='friend_row'>
              <div className='friend_profile'>
                <img src={friend.userProfileImg} alt='유저 이미지' />
                <span>{friend.nickname}</span>
              </div>
            </div>
          ))}
        {!friendList.follower.length && <div className='friend_no'>팔로워한 친구가 없어요.</div>}
      </FriendList>
    );
  }
  const getFolllowing = useCallback(async () => {
    try {
      const response = await instance.get(`/api/following/${nickname}`);
      const followingList = response.data;
      if (followingList !== 0) {
        setFriendList({ ...friendList, following: followingList });
      }
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  }, [nickname]);

  const getFollower = useCallback(async () => {
    try {
      const response = await instance.get(`/api/follower/${nickname}`);
      const followerList = response.data;
      if (followerList !== 0) {
        setFriendList({ ...friendList, follower: followerList });
      }
    } catch (error) {
      console.log(error);
    }
  }, [nickname]);

  useEffect(() => {
    getFolllowing();
  }, [nickname, getFolllowing]);

  useEffect(() => {
    getFollower();
  }, [nickname, getFollower]);

  return (
    isLoading && (
      <div>
        <Tap mode={chooseTap}>
          <div onClick={() => handleChangeTap('following')}>팔로잉</div>
          <div onClick={() => handleChangeTap('follower')}>팔로워</div>
        </Tap>
        {content}
      </div>
    )
  );
};

const Tap = styled.div`
  display: flex;
  width: 100%;
  cursor: pointer;
  div {
    width: 50%;
    text-align: center;
    font-size: 14px;
    font-weight: 800;
    padding: 5% 0;
    border-radius: 10px 10px 0 0;
  }
  div:first-of-type {
    border-bottom: 3px solid ${(props) => (props.mode === 'following' ? props.theme.color.main : '#d9d9d9')};
    background-color: ${(props) => props.mode === 'following' && 'rgba(0, 0, 0, 0.1)'};
  }
  div:nth-of-type(2) {
    border-bottom: 3px solid ${(props) => (props.mode === 'follower' ? props.theme.color.main : '#d9d9d9')};
    background-color: ${(props) => props.mode === 'follower' && 'rgba(0, 0, 0, 0.1)'};
  }
`;

const FriendList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5% auto 0 auto;
  .friend_row {
    display: flex;
    align-items: center;
    font-size: 16px;
    padding: 2.5% 5%;
    img {
      width: 3em;
      height: 3em;
      border-radius: 50%;
    }
    span {
      padding-left: 4%;
      font-size: 14px;
    }
  }
  .friend_row:hover {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
  }
  .friend_profile {
    width: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .friend_no {
    display: inline-block;
    margin-top: 15%;
    text-align: center;
    font-size: 14px;
  }
`;

const DeleteBtn = styled.div`
  text-align: center;
  width: 25%;
  height: 3%;
  padding: 3% 0;
  font-weight: 800;
  border: 2px solid red;
  border-radius: 30px;
  color: red;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    background-color: red;
    transform: scale(1.1);
  }
`;

export default Friends;
