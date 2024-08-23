import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./Landing";

// import Profile from "./Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  // {            examole to place in ur components...specify the path and element(component
  //   path: "profile",
  //   element: <Profile />,
  // },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />    
  </React.StrictMode>
);
