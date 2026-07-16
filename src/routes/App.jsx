import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import CreatePost from "../components/CreatePost";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Post from "../components/Post";

import PostList from "../components/PostList";
import { useState } from "react";
import PostListProvider from "../store/post-list-store";
import { Outlet } from "react-router-dom";

function App() {
  const [selectedTab, setSelectedTab] = useState("Home");

  return (
    <>
      <PostListProvider>
        <div className="app-container">
          <SideBar
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          ></SideBar>
          <div className="content">
            <Header></Header>
            {/* {selectedTab === "Home" ? (
              <PostList></PostList>
            ) : (
              <CreatePost></CreatePost>
            )} */}

            <Outlet></Outlet>
            <Footer></Footer>
          </div>
        </div>
      </PostListProvider>
    </>
  );
}

export default App;
