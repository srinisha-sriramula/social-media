import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CreatePost from "./components/CreatePost";

import App from "./App.jsx";
const router = createBrowserRouter([
  { path: "/", element: <App></App> },
  { path: "/create-post", element: <CreatePost /> },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
