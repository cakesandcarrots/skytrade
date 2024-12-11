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
import ProductList from "./features/product/components/ProductList";
import Protected from "./features/auth/components/Protected";

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

  return (
    <>
  <RouterProvider router={router} />
    </>
  )
}

export default App
