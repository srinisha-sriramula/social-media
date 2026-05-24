import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList=currPostList;
  if(action.type==='DELETE_POST'){
    newPostList=currPostList.filter(post=>post.id!==action.payload.postId)
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST,
  );
  const addPost = () => {};
  const deletePost = (postId) => {
    dispatchPostList(
      {
        type:"DELETE_POST",
        payload:{
          postId : postId,
        }
      }
    )
  };
  return (
    <>
      <PostList.Provider
        value={{ postList: postList, addPost: addPost, deletePost: deletePost }}
      >
        {children}
      </PostList.Provider>
    </>
  );
};
const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "going to mumbai",
    body: "hi friends,i am going to mumbai for my vacations.hope to enjoy a lot",
    reactions: 2,
    userId: "user-9",
    tags: ["vacation", "mumbai"],
  },
  {
    id: "2",
    title: "going to goa",
    body: "hi friends,i am going to goa for my vacations.hope to enjoy a lot",
    reactions: 15,
    userId: "user-12",
    tags: ["unbelievable", "graduaton"],
  },
  
  
];
export default PostListProvider;
