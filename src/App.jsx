import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Homepage from "./pages/HomePage";
import Cart from "./features/cart/Cart";
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

]);

function App() {

  return (
    <>
  <RouterProvider router={router} />
    </>
  )
}

export default App
