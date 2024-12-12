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
import { selectLoggedInUser } from "./features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";

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

]);

function App() {
const dispatch = useDispatch();
const user = useSelector(selectLoggedInUser);
if(user){
  dispatch(fetchItemsByUserIdAsync(user.id))
}
  return (
    <>
  <RouterProvider router={router} />
    </>
  )
}

export default App
