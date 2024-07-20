import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import SignUp from './Components/SignIn/SignUp.jsx'
import LogIn from './Components/LogIn/LogIn.jsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashBoard from './Components/DashBoard/DashBoard.jsx'
import CreatePost from './Components/CreatePost/CreatePost.jsx'
import Home from './Components/Home/Home.jsx'
const routes = createBrowserRouter([
  {
    path:'/',element:<SignUp></SignUp>
  },
  {
    path:'/signup',element:<SignUp></SignUp>
  },
  {
    path:'/login',element:<LogIn></LogIn>
  },
  {
    path:'/dashboard',element:<DashBoard></DashBoard>
  },
  {
    path:'/createpost',element:<CreatePost></CreatePost>
  },
  {
    path:'/home',element:<Home></Home>
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes}></RouterProvider>
  </React.StrictMode>,
)
