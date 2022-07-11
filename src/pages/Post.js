import React from "react";

// element
import Wrap from "../elements/Wrap";

// components
import PostCard from "../components/PostCard";
import SubHeader from "../elements/SubHeader";

// redux
import { useSelector, useDispatch } from "react-redux";
import { loadPostsDB } from "../redux/modules/postSlice";

const Post = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.list[0]);
  console.log(posts)
 
  React.useEffect(() => {
    dispatch(loadPostsDB());
  }, [dispatch]);

  return (
    <Wrap>
      <SubHeader title={'자랑하기'}> </SubHeader>
      {posts.map((post) => (
        <PostCard key={post.boardMainId} data={post} />
      ))}
    </Wrap>
  );
};

export default Post;
