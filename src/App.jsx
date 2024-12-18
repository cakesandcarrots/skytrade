import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Homepage from "./pages/HomePage";
import Cart from "./features/cart/Cart";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetails from "./features/product/components/ProductDetails";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import { useEffect } from "react";
import DefaultPage from "./pages/DefaultPage";
import OrderSuccesspage from "./pages/OrderSuccessPage";
import UserOrderPage from "./pages/UserOrderPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync, selectUserInfo } from "./features/user/userSlice";
import { selectLoggedInUser } from "./features/auth/authSlice";

const router = createBrowserRouter([
  {
    path: "/signup",
    element:<SignupPage/> ,
  },
  {
    path: "/login",
    element:<LoginPage/>,
  },
  {
    path: "/",
    element:<Protected><Homepage/></Protected>,
  },
  {
    path: "/cart",
    element:<Protected><Cart/></Protected>,
  },
  {
    path: "/checkout",
    element:<Protected><CheckoutPage/></Protected>,
  },
  {
    path: "/productdetails/:id",
    element: <Protected><ProductDetails/></Protected>
  },
  {
    path: "order-success/:id",
    element: <OrderSuccesspage></OrderSuccesspage>
  },
  {
    path: "*",
    element: <DefaultPage></DefaultPage>
  },
  {
    path:"/orders",
    element: <UserOrderPage></UserOrderPage>
  },
  {
    path: "/profile",
    element: <UserProfilePage></UserProfilePage>
  }

]);

function App() {
const dispatch = useDispatch();
const user = useSelector(selectLoggedInUser);

useEffect(()=>{
  if(user){
    dispatch(fetchLoggedInUserAsync(user.id))
    dispatch(fetchItemsByUserIdAsync(user.id))
  }
},[dispatch, user])

  return (
    <>
  <RouterProvider router={router} />
    </>
  )
}

export default App
