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
    element:<Homepage/>,
  },
  {
    path: "/cart",
    element:<Cart/>,
  },
  {
    path: "/checkout",
    element:<CheckoutPage/>,
  },
  {
    path: "/productdetails/:id",
    element: <ProductDetails />
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
