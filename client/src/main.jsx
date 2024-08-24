import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from './Landing';
import Signup from './components/Farmer/Signup';
import Dashboard from './components/Buyer/BDashboard';
import  NotFoundPage  from './components/NotFoundPage';
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Landing />,
//   },
//   {
//     path:'/signup',
//     element:<Signup/>
//   }
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Signup />} />
        <Route path="/buyer" element={<Dashboard />} />
        <Route path="/*" element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
