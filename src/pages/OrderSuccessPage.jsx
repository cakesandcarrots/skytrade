import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { resetCartAsync } from "../features/cart/cartSlice";
import { resetOrder } from "../features/order/orderSlice";

function OrderSuccesspage() {
const params = useParams();
const dispatch = useDispatch()
const user = useSelector(selectLoggedInUser)
  useEffect(()=>{
      dispatch(resetCartAsync())
    dispatch(resetOrder());
  },[dispatch,user])
  return (
    <>
  <div className="flex min-h-screen items-center justify-center bg-white"> {/* Wrap in a flex container */}
  <main className="grid max-w-screen-xl mx-auto"> {/* Maintain max-width and centering */}
    <div className="text-center">
      <h1 className="mt-4 text-balance lg:text-5xl font-semibold tracking-tight text-gray-900 sm:text-2xl lg:text-5xl">
        Order Number {params.id}
      </h1>
      <p className="mt-6 text-pretty text-sm lg:text-lg font-medium text-gray-500 sm:text-xl/8">
        {`You can check your order in My Account > My Orders`}
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link to="/"
          className="rounded-md bg-indigo-600 px-1 py-2 sm:px-3.5 sm:py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Go back home
        </Link>
      </div>
    </div>
  </main>
</div>
    </>
  );
}

export default OrderSuccesspage;
