// react
import { useState, useEffect, useCallback } from 'react';

// components
import Friends from '../components/Mypage/Friends';

// element
import Wrap from '../elements/Wrap';
import UserTop from '../elements/UserTop';

// style
import styled from 'styled-components';

// redux
import { useSelector } from 'react-redux';

// cookie
import { getCookie } from '../shared/cookie';

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

  const [tap, setTap] = useState('post');
  const [contents, setContents] = useState({ post: [], community: [], reels: [] });

  useEffect(() => {
    if (Object.keys(userInfo)) {
      userInfo.nickname !== nickname && setStep(0);
      setIsLoading(true);
    }
  }, [userInfo]);

  const getPost = useCallback(async () => {
    console.log('내가 쓴 자랑 글 테스트');
    try {
      const response = await instance.get(`/api/mypage/post/${nickname}?page=0`);
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
    if (!isLogin) navigate('/login');
  });

  // 페이지 이동
  const handleMoveStep = (stepNum) => {
    setStep(stepNum);
  };

  let content = '';

  if (step === 0) {
    content = (
      <>
        <Profile>
          <img src={userInfo.img} alt='프로필 이미지' />
          <span>{userInfo.nickname}</span>
        </Profile>
        <Follow onClick={() => setStep(1)}>
          {/* 닉네임으로 팔로잉 팔로워 수 가져오기 */}
          <div>
            <span>팔로잉</span>
            <span>10</span>
            {/* <span>{friendList.following.length}</span> */}
          </div>
          <div>|</div>
          <div>
            <span>팔로우</span>
            <span>5</span>
            {/* <span>{friendList.follower.length}</span> */}
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
    content = <Friends nickname={nickname} />;
  }
  // else if (step === 2) {
  //   content = (
  //     <div style={{ width: '80%', margin: '85% auto 0 auto' }}>
  //       <Logout type='button' onClick={logout}>
  //         로그아웃
  //       </Logout>
  //     </div>
  //   );
  // }

  return (
    isLoading && (
      <Wrap>
        <UserTop
          title={nickname}
          type='mypage'
          step={step}
          moveStep={handleMoveStep}
          showLogout={nickname === userInfo.nickname}
        />
        {content}
        <ContentContainer>
          {step === 0 &&
            tap === 'post' &&
            (contents.post?.length ? (
              contents.post.map((p) => (
                <Content key={p.boardMainId}>
                  <img
                    src={p.img[0].url}
                    alt='자랑하기 글 이미지'
                    onClick={() => navigate(`/post/detail/${p.boardMainId}`)}
                  />
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
                  <img
                    src={p.img[0].url}
                    alt='커뮤니티 글 이미지'
                    onClick={() => navigate(`/post/detail/${p.boardMainId}`)}
                  />
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
                  <img src={p.img[0].url} alt='릴스 이미지' onClick={() => navigate(`/post/detail/${p.boardMainId}`)} />
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
  padding-bottom: 6.9%;
  img {
    width: 100%;
    height: 131%;
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
    width: 4.5em;
    height: 4.5em;
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
