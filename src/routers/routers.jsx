import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import Signup from "../pages/Authentication/Signup";
import Signin from "../pages/Authentication/Signin";
import ProductDetail from "../pages/ProductDetail";
import OrderHistory from "../pages/OrderHistory";
import ProductList from "../pages/ProductList";
import Checkout from "../pages/Checkout";
import Cart from "../pages/Cart/Cart";
import Details from "../pages/Detailorders";
import Admin from "../pages/Admin";
import OrderDetail from "../pages/OrderHistory/OrderDetail";
import AboutPage from "../pages/About/AboutPage";

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
    path: "/detail/:productId",
    element: <ProductDetail />,
  },
  {
    path: "/productlist",
    element: <ProductList/>
  },
  {
    path: "/cart",
    element: <Cart/>
  },
  {
    path: "/orderHistory",
    element: <OrderHistory/>
  },
  {
    path: "/checkout",
    element: <Checkout/>
  },
   {
    path: "/admin/",
    element: <Admin/>
  },
  {
    path: '/orderDetail/:orderId',
    element: <OrderDetail/>
  },
  {
    path: '/about',
    element: <AboutPage/>
  }
]);

export default routers;
