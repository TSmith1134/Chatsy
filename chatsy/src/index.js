import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ErrorPage from './errorPage';
import reportWebVitals from './reportWebVitals';
import Login from './login/Login';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home } from './home/Home';
import Register from './register/Register';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <Home></Home>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register></Register>,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
