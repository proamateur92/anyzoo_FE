import React from 'react';

// 컴포넌트
import Wrap from '../elements/Wrap';
import PostCard from '../components/PostCard';
import PostHeader from '../elements/PostHeader';

// 리덕스 
import { useSelector, useDispatch } from 'react-redux'
import { loadPostsDB } from '../redux/modules/postSlice';

// CSS 관련 임포트
import styled from 'styled-components';

const Post = () => {
  const dispatch = useDispatch()
  const posts = useSelector(state => state.post.list)
  console.log(posts)

  React.useEffect(() => {
    dispatch(loadPostsDB())
  }, [])

  return (
    <Wrap>
      <PostHeader/>

      {
        posts.map((post,i) => <PostCard key={post.postId} data={post.boardMain[0]}/>)
      }

    </Wrap>
  );
};

export default Post;
