import { useRef } from "react";
import { PostList } from "../store/post-list-store";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { addPost } = useContext(PostList);
  const navigate = useNavigate();

  const userIdElement = useRef();
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const reactionsElement = useRef();
  const tagsElement = useRef();
  const likesElement = useRef();
  const dislikesElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = userIdElement.current.value;
    const postTitle = postTitleElement.current.value;
    const postBody = postBodyElement.current.value;
    // const reactions = reactionsElement.current.value;
    const tags = tagsElement.current.value.split(" ");
    const likes = likesElement.current.value;
    const dislikes = dislikesElement.current.value;

    userIdElement.current.value = "";
    postTitleElement.current.value = "";
    postBodyElement.current.value = "";
    // reactionsElement.current.value = "";
    tagsElement.current.value = "";
    likesElement.current.value = "";
    dislikesElement.current.value = "";

    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: Date.now(),
        title: postTitle,
        body: postBody,
        // reactions: reactions,

        reactions: {
          likes,
          dislikes,
        },
        userId: userId,
        tags: tags,
      }),
    })
      .then((res) => res.json())
      .then((post) => {
        addPost({
          ...post,
          id: crypto.randomUUID(),
        });

        navigate("/");
      });
  };
  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          Enter your userId
        </label>
        <input
          type="text"
          ref={userIdElement}
          className="form-control"
          id="userId"
          placeholder="Your user Id"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Post Title
        </label>
        <input
          type="text"
          ref={postTitleElement}
          className="form-control"
          id="title"
          placeholder="Have Are You Feeling Today..."
        />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Post Content
        </label>
        <textarea
          type="text"
          ref={postBodyElement}
          rows="4"
          className="form-control"
          id="body"
          placeholder="Tell us more about it"
        />
      </div>

      {/* <div className="mb-3">
        <label htmlFor="reactions" className="form-label">
          Number Of Reactions
        </label>
        <input
          type="text"
          ref={reactionsElement}
          className="form-control"
          id="reactions"
          placeholder="How many people reacted to this post"
        />
      </div> */}

      <div className="mb-3">
        <label htmlFor="likes" className="form-label">
          Likes
        </label>
        <input
          type="text"
          ref={likesElement}
          className="form-control"
          id="likes"
          placeholder="Enter likes"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="dislikes" className="form-label">
          Dislikes
        </label>
        <input
          type="text"
          ref={dislikesElement}
          className="form-control"
          id="dislikes"
          placeholder="Enter dislikes"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Enter your hashtags
        </label>
        <input
          type="text"
          ref={tagsElement}
          className="form-control"
          id="tags"
          placeholder="Please enter tags using space"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
};
export default CreatePost;
