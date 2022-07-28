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

// sweetalert
import Swal from 'sweetalert2';

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
  const myInfo = useSelector((state) => state.user.info);
  const [userInfo, setUserInfo] = useState({});
  const isLogin = getCookie('accessToken') ? true : false;
  const navigate = useNavigate();

  const [contents, setContents] = useState({ post: [], community: [], together: [], reels: [] });
  const contentType = ['post', 'community', 'together', 'reels'];
  const [tap, setTap] = useState(contentType[0]);

  // 회원정보 가져오기
  useEffect(() => {
    setIsLoading(false);
    getUserInfo();
    setTap(contentType[0]);
    getContent(contentType[0]);
  }, [nickname]);

  const getUserInfo = async () => {
    try {
      const response = await instance.get(`/api/mypage/userInfo/${nickname}`);
      console.log('로그인 별 회원정보');
      if (!response.data) {
        Swal.fire({
          title: `존재하지 않는 회원이에요. 메인페이지로 이동합니다.`,
          icon: 'warning',
          confirmButtonText: '확인',
          confirmButtonColor: '#44DCD3',
        });
        navigate('/');
        return;
      }
      setUserInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getContent = useCallback(
    async (newTap) => {
      try {
        const response = await instance.get(`/api/mypage/${newTap}/${nickname}?page=0`);
        const contentList = response.data.content;
        if (contentList.length !== 0) {
          setContents({ ...contents, [newTap]: contentList });
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(true);
    },
    [nickname, contents]
  );

  useEffect(() => {
    setIsLoading(false);
    const newTap = tap;
    getContent(newTap);
  }, [tap]);

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
          <span>{nickname}</span>
        </Profile>
        <Follow onClick={() => setStep(1)}>
          <div>
            <span>팔로잉</span>
            <span>{userInfo.following}</span>
          </div>
          <div>|</div>
          <div>
            <span>팔로우</span>
            <span>{userInfo.follower}</span>
          </div>
        </Follow>
        <Tap>
          <div onClick={() => setTap(contentType[0])}>
            <span>자랑하기</span>
          </div>
          <div onClick={() => setTap(contentType[1])}>
            <span>커뮤니티</span>
          </div>
          <div onClick={() => setTap(contentType[2])}>
            <span>함께하기</span>
          </div>
          <div onClick={() => setTap(contentType[3])}>
            <span>릴스</span>
          </div>
        </Tap>
      </>
    );
  } else if (step === 1) {
    content = <Friends nickname={nickname} handleMoveStep={handleMoveStep} />;
  }
  return (
    isLoading && (
      <Wrap>
        <UserTop
          title={myInfo.nickname !== nickname ? nickname : '마이페이지'}
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
                <Content key={p.boardMainId}>
                  {/* <img
                    src={p.img[0].url}
                    alt='커뮤니티 글 이미지'
                    onClick={() => navigate(`/post/detail/${p.boardMainId}`)}
                  /> */}
                  {/* communityId, boardMainId, boardKind, contents, likeCnt, dateTime, nickname, userProfileImg, img */}
                </Content>
              ))
            ) : (
              <span>작성한 커뮤니티 글이 없어요.</span>
            ))}
          {step === 0 &&
            tap === 'together' &&
            (contents.together?.length ? (
              contents.together.map((p) => (
                <Content key={p.boardMainId}>
                  {/* <img
                    src={p.img[0].url}
                    alt='커뮤니티 글 이미지'
                    onClick={() => navigate(`/post/detail/${p.boardMainId}`)}
                  /> */}
                  {/* togetherId, boardMainId, boardKind, cityName, provinceName, title, contents, peopleCnt, limitPeople, likeCnt, dday, dateTime, nickname, userProfileImg, img */}
                </Content>
              ))
            ) : (
              <span>작성한 함께하기 글이 없어요.</span>
            ))}
          {step === 0 &&
            tap === 'reels' &&
            (contents.reels?.length ? (
              contents.reels.map((p) => (
                <Content key={p.boardMainId}>
                  {/* <img src={p.titleImg} alt='릴스 이미지' onClick={() => navigate(`/reels/detail/${p.boardMainId}`)} /> */}
                  {/* 일단 링크 대기중 */}
                  <img src={p.titleImg} alt='릴스 이미지' />
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
  width: 25%;
  img {
    width: 100%;
    height: 100%;
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

export default Mypage;
