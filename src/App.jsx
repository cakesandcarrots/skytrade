import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Homepage from "./pages/HomePage";
import Cart from "./features/cart/Cart";
import CheckoutPage from "./pages/CheckoutPage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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

]);

function App() {

  return (
    <>
  <RouterProvider router={router} />
    </>
  )
}

export default App
