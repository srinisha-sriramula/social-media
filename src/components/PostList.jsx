import { useContext } from "react";
import { PostList as PostListData } from "../store/post-list-store";
import Post from "./Post";
import WelcomeMessage from "./WelcomeMessage";
const PostList = () => {
  const { postList } = useContext(PostListData);
  return (
    <>
    {postList.length===0 && <WelcomeMessage></WelcomeMessage>}
      {postList.map((post) => (
        <Post key={post.id} post={post}></Post>
      ))}
    </>
  );
};
export default PostList;
