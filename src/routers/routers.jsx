import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import Signup from "../pages/Authentication/Signup";
import Signin from "../pages/Authentication/Signin";
import Product from "../pages/Product";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import OrderHistory from "../pages/OrderHistory";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/detail/:idProduct",
    element: <ProductDetail />,
  },
  {
    path: "/cart",
    element: <Cart/>
  },
  {
    path: "/orderHistory",
    element: <OrderHistory/>
  }
]);

export default routers;
