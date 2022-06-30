import Wrap from '../elements/Wrap';

// 컴포넌트
import PostCard from '../components/PostCard';
import PostHeader from '../elements/PostHeader';

// CSS 관련 임포트
import styled from 'styled-components';

const Post = () => {
  return (
    <Wrap>
      <PostHeader/>
      <PostCard/>
      
    </Wrap>
  );
};

export default Post;
