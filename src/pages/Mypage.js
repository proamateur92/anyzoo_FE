// react
import { useState, useEffect, useCallback } from 'react';

// element
import Wrap from '../elements/Wrap';
import UserTop from '../elements/UserTop';

// style
import styled from 'styled-components';

// sweetalert
import Swal from 'sweetalert2';

// redux
import { useSelector } from 'react-redux';

// cookie
import { clearCookie, getCookie } from '../shared/cookie';

// router
import { useNavigate, useParams } from 'react-router-dom';

// axios
import instance from '../shared/axios';

const Mypage = () => {
  const { nickname } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);
  const userInfo = useSelector((state) => state.user.info);
  const isLogin = getCookie('accessToken') ? true : false;
  const navigate = useNavigate();
  const [friendList, setFriendList] = useState({ following: [], follower: [], isShow: false });

  const [tap, setTap] = useState('post');
  const [contents, setContents] = useState({ post: [], community: [], reels: [] });
  console.log(contents);
  // console.log('유저정보 가져오기');
  // console.table(userInfo);

  const logout = () => {
    Swal.fire({
      title: '로그아웃 하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '로그아웃',
      cancelButtonText: '취소',
      confirmButtonColor: '#44DCD3',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        clearCookie('accessToken');
        clearCookie('refreshToken');
        navigate('/login');
      }
    });
  };

  useEffect(() => {
    if (Object.keys(userInfo)) {
      setIsLoading(true);
    }
  }, [userInfo]);

  const getFolllowing = useCallback(async () => {
    try {
      console.log('팔로잉테스트');
      const response = await instance.get(`/api/following/${userInfo.nickname}`);
      const followingList = response.data;
      if (followingList !== 0) {
        setFriendList({ ...friendList, following: followingList });
      }
    } catch (error) {
      console.log(error);
    }
  }, [userInfo.nickname]);

  const getFollower = useCallback(async () => {
    try {
      console.log('팔로워 테스트');
      const response = await instance.get(`/api/follower/${userInfo.nickname}`);
      const followerList = response.data;
      if (followerList !== 0) {
        setFriendList({ ...friendList, follower: followerList });
      }
    } catch (error) {
      console.log(error);
    }
  }, [userInfo.nickname]);

  const getPost = useCallback(async () => {
    console.log('내가 쓴 자랑 글 테스트');
    try {
      const response = await instance.get(`/api/mypage/post/${userInfo.nickname}?page=0`);
      const postList = response.data.content;
      if (postList.length !== 0) {
        setContents({ ...content, post: postList });
      }
    } catch (error) {
      console.log(error);
    }
  }, [userInfo.nickname]);

  useEffect(() => {
    if (!userInfo.nickname) return;
    getPost();
  }, [userInfo.nickname, getPost]);

  useEffect(() => {
    if (!userInfo.nickname) return;
    getFolllowing();
  }, [userInfo.nickname, getFolllowing]);

  useEffect(() => {
    if (!userInfo.nickname) return;
    getFollower();
  }, [userInfo.nickname, getFollower]);

  useEffect(() => {
    if (!isLogin) navigate('/login');
  });

  // 페이지 이동
  const handleMoveStep = (stepNum) => {
    setStep(stepNum);
  };

  const handleShowFollowing = () => {
    try {
      const response = instance.get('');
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  let content = '';

  if (step === 0) {
    content = (
      <>
        <Follow>
          <div onClick={handleShowFollowing}>
            <span>팔로잉</span>
            <span>{friendList.following.length}</span>
          </div>
          <div>|</div>
          <div>
            <span>팔로우</span>
            <span>{friendList.follower.length}</span>
          </div>
        </Follow>
        <Tap>
          <div onClick={() => setTap('post')}>
            <span>자랑하기</span>
          </div>
          <div onClick={() => setTap('community')}>
            <span>커뮤니티</span>
          </div>
          {/* <div>
            <span>모집글</span>
          </div> */}
          <div onClick={() => setTap('reels')}>
            <span>릴스</span>
          </div>
        </Tap>
      </>
    );
  } else if (step === 1) {
    content = (
      <div style={{ width: '80%', margin: '85% auto 0 auto' }}>
        <Logout type='button' onClick={logout}>
          로그아웃
        </Logout>
      </div>
    );
  }
  return (
    isLoading && (
      <Wrap>
        <UserTop
          title='마이페이지'
          type='mypage'
          step={step}
          moveStep={handleMoveStep}
          showLogout={nickname === userInfo.nickname}
        />
        <Profile>
          <img src={userInfo.img} alt='프로필 이미지' />
          <span>{userInfo.nickname}</span>
        </Profile>
        {content}
        <ContentContainer>
          {step === 0 &&
            tap === 'post' &&
            (contents.post?.length ? (
              contents.post.map((p) => (
                <Content key={p.boardMainId}>
                  <img src={p.img[0].url} onClick={() => navigate(`/post/detail/${p.boardMainId}`)} />
                </Content>
              ))
            ) : (
              <span>작성한 글이 없어요.</span>
            ))}
          {step === 0 &&
            tap === 'community' &&
            (contents.community?.length ? (
              contents.community.map((p) => (
                <Content>
                  <img src={p.img[0].url} onClick={() => navigate(`/post/detail/${p.boardMainId}`)} />
                </Content>
              ))
            ) : (
              <span>작성한 커뮤니티 글이 없어요.</span>
            ))}
          {step === 0 &&
            tap === 'reels' &&
            (contents.reels?.length ? (
              contents.reels.map((p) => (
                <Content>
                  <img src={p.img[0].url} onClick={() => navigate(`/post/detail/${p.boardMainId}`)} />
                </Content>
              ))
            ) : (
              <span>작성한 릴스가 없어요.</span>
            ))}
        </ContentContainer>
      </Wrap>
    )
  );
};

const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Content = styled.div`
  width: 33.3%;
  padding-bottom: 33.3%;
  transition: 0.3s all ease-in-out;
  img {
    width: 100%;
    height: 130%;
    cursor: pointer;
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  margin-top: 3%;
  img {
    width: 4em;
    height: 4em;
    border-radius: 50%;
  }
  span {
    display: block;
    margin: 3.5% 0 5% 0;
  }
`;

const Follow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 6%;
  div {
    display: flex;
    flex-direction: column;
  }
  div:first-of-type {
    cursor: pointer;
  }
  div:nth-of-type(2) {
    margin: 0 4%;
    font-size: 1px;
    color: #d9d9d9;
  }
  div:nth-of-type(3) {
    cursor: pointer;
  }
  span:first-of-type {
    margin: 2% 0;
  }
`;

const Tap = styled.div`
  display: flex;
  font-size: 12px;
  font-weight: 800;
  border-top: 1.5px solid #d9d9d9;
  border-bottom: 1.5px solid #d9d9d9;
  div {
    padding: 5%;
    width: 33.3%;
    cursor: pointer;
    text-align: center;
  }
  div:hover {
    background-color: red;
  }
`;

const Logout = styled.button`
  width: 100%;
  padding: 5% 2%;
  border-radius: 10px;
  background-color: #ffffff;
  color: #f91f1f;
  font-size: 18px;
  font-weight: 800;
  border: 2px solid #f91f1f;
`;

export default Mypage;
