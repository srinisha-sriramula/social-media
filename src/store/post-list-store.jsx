import {
  createContext,
  useCallback,
  useReducer,
  useState,
  useEffect,
} from "react";

export const PostList = createContext({
  postList: [],
  fetching: false,
  addPost: () => {},
  deletePost: () => {},
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
  // const [postList, dispatchPostList] = useReducer(postListReducer, []);
  const [postList, dispatchPostList] = useReducer(postListReducer, [], () => {
    const savedPosts = localStorage.getItem("posts");
    return savedPosts ? JSON.parse(savedPosts) : [];
  });
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

  // useEffect(() => {
  //   setFetching(true);
  //   const controller = new AbortController();
  //   const signal = controller.signal;

  //   fetch("https://dummyjson.com/posts", { signal })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       addInitialPosts(data.posts);
  //       setFetching(false);
  //     });

  //   return () => {
  //     console.log("Cleaning up UseEffect.");
  //     controller.abort();
  //   };
  // }, []);

  useEffect(() => {
    if (postList.length > 0) return;

    setFetching(true);

    const controller = new AbortController();

    fetch("https://dummyjson.com/posts", {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        addInitialPosts(data.posts);
        setFetching(false);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (postList.length > 0) {
      localStorage.setItem("posts", JSON.stringify(postList));
    }
  }, [postList]);

  return (
    <>
      <PostList.Provider value={{ postList, fetching, addPost, deletePost }}>
        {children}
      </PostList.Provider>
    </>
  );
};

export default PostListProvider;
