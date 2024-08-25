import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./Landing";
import Signup from "./components/Buyer/Signup"
import Login from "./components/Buyer/Login";
import FLogin from "./components/Farmer/FLogin";
import FSignup from "./components/Farmer/FSignup";
import Chat from "./components/Negotiate/Chat";

// import Profile from "./Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path:"/login",
    element: <Login/>,
  },
  {
    path:"/flogin",
    element: <FLogin/>,
  },
  {
    path: "/fsignup",
    element: <FSignup />,
  },
  {
    path:"/chat",
    element:<Chat/>,
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
