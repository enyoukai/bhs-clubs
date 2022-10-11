import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import Root from './routes/Root';
import Home from './routes/Home';
import PageNotFound from './routes/PageNotFound';
import SignIn from './routes/SignIn';

import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root  />,
    errorElement: <PageNotFound/>,
    children: [
      {
        path: "signin",
        element: <SignIn/>
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
