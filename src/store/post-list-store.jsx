import { createContext,useCallback, useReducer, useState, useEffect  } from "react";

export const PostList = createContext({
  postList: [],
  fetching: false,
  addPost: () => {},
  deletePost: () => {},
  // addInitialPosts: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId,
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  } else if (action.type === "ADD_INITIAL_POSTS") {
    newPostList = action.payload.posts;
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);
  const [fetching, setFetching] = useState(false);

  const addPost = (post) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: post,
    });
  };

  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts,
      },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId: postId,
      },
    });
  };

  useEffect(() => {
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;

    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        addInitialPosts(data.posts);
        setFetching(false);
      });

    return () => {
      console.log("Cleaning up UseEffect.");
      controller.abort();
    };
  }, []);
  return (
    <>
      <PostList.Provider
        value={{ postList,fetching, addPost, deletePost,  }}
      >
        {children}
      </PostList.Provider>
    </>
  );
};
// const DEFAULT_POST_LIST = [
//   {
//     id: "1",
//     title: "going to mumbai",
//     body: "hi friends,i am going to mumbai for my vacations.hope to enjoy a lot",
//     reactions: 2,
//     userId: "user-9",
//     tags: ["vacation", "mumbai"],
//   },
//   {
//     id: "2",
//     title: "going to goa",
//     body: "hi friends,i am going to goa for my vacations.hope to enjoy a lot",
//     reactions: 15,
//     userId: "user-12",
//     tags: ["unbelievable", "graduaton"],
//   },
// ];
export default PostListProvider;
