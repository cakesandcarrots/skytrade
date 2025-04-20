import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  deleteItemFromCartAsync,
  selectProductsByUserId,
  updateCartAsync,
} from "../features/cart/cartSlice";
import { useForm } from "react-hook-form";
import {
  createOrderAsync,
  selectCurrentOrder,
  selectOrderCreatedStatus,
} from "../features/order/orderSlice";
import { selectUserInfo, updateUserAsync } from "../features/user/userSlice";
import { toast, Bounce } from "react-toastify";

function CheckoutPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const userInfo = useSelector(selectUserInfo);

  const currentOrder = useSelector(selectCurrentOrder);
  const items = useSelector(selectProductsByUserId);
  const [open, setOpen] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [checkIndex, setCheckIndex] = useState(0);
  const [loadingToastId, setLoadingToastId] = useState(null); // State for loading toast
  const [isPlacingOrder, setIsPlacingOrder] = useState(false); // Add state for disabling button
  const totalAmount = items.reduce(
    (amount, item) =>
      Math.round((item.product.price * item.quantity + amount) * 100 / 100),
    0
  );
  const totalItems = items.reduce((amount, item) => item.quantity + amount, 0);
  const orderCreatedStatus = useSelector(selectOrderCreatedStatus);
  const dispatch = useDispatch();

  function handleQuantity(e, product) {
    dispatch(
      updateCartAsync({ id: product.product.id, quantity: +e.target.value })
    );
  }
  function handleDelete(e, cartItemId) {
    dispatch(deleteItemFromCartAsync(cartItemId));
  }

  useEffect(() => {
    setSelectedAddress(userInfo.addresses[checkIndex]);
  }, [checkIndex, userInfo]);

  useEffect(() => {
    if (loadingToastId && orderCreatedStatus) {
      toast.dismiss(loadingToastId);
      setLoadingToastId(null);
    }
  }, [orderCreatedStatus, loadingToastId]);

  const handleAddress = (e) => {
    setCheckIndex(+e.target.value);
  };

  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleOrder = () => {
    if (!selectedAddress) {
      toast.warning("You have to select an address", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setIsPlacingOrder(false); // Reset if validation fails
      return;
    }
    const order = {
      user: userInfo,
      selectedAddress,
      paymentMethod,
      items,
      totalAmount,
      totalItems,
      status: "pending",
    };

    const toastId = toast.loading("Creating your order...", {
      position: "top-center",
      hideProgressBar: true,
    });
    setLoadingToastId(toastId);
    setIsPlacingOrder(true); // Disable button before dispatching

    dispatch(createOrderAsync(order));
  };

  return (
    <>
      {items.length == 0 && <Navigate to="/" replace="true"></Navigate>}
      {currentOrder && currentOrder.paymentMethod == "cash" && (
        <Navigate
          to={`/order-success/${currentOrder.id}`}
          replace="true"
        ></Navigate>
      )}
      {currentOrder && currentOrder.paymentMethod == "card" && (
        <Navigate to={`/stripe-checkout`} replace="true"></Navigate>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className=" lg:col-span-3 ">
            <form
              className=" bg-white px-5 mt-12"
              onSubmit={handleSubmit((data) => {
                dispatch(
                  updateUserAsync({
                    ...userInfo,
                    addresses: [...userInfo.addresses, data],
                  })
                );
                reset();
              })}
            >
              {" "}
              <div className="mx-auto py-6 max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900 my-5">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>



                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          id="name"
                          {...register("name", {
                            required: "Name can't be empty",
                          })}
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "Email can't be empty",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        {...register("phone", {
                          required: "Phone number can't be empty",
                        })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          id="street"
                          {...register("street", {
                            required: "Street can't be empty",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          id="city"
                          {...register("city", {
                            required: "City can't be empty",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State
                      </label>
                      <div className="mt-2">
                        <input
                          id="region"
                          {...register("state", {
                            required: "State can't be empty",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        PIN code
                      </label>
                      <div className="mt-2">
                        <input
                          id="postal-code"
                          {...register("pincode", {
                            required: "PIN code can't be empty",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                          type="button"
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Reset
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Add Address
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Saved Addresses
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Select an existing address
                  </p>
                  <ul role="list">
                    {userInfo.addresses.length > 0 ? (
                      userInfo.addresses.map((address, index) => {
                        return (
                          <li
                            key={address.name}
                            className="flex flex-col sm:flex-row justify-between border-2 px-5 gap-x-6 py-5"
                          >
                            <div className="flex min-w-0 gap-x-4 flex-col sm:flex-row">
                              <input
                                onChange={(e) => handleAddress(e)}
                                id="address"
                                name="addresschoice"
                                type="radio"
                                required
                                value={index}
                                checked={checkIndex === index}
                                className="border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                  {address.name}
                                </p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                  {address.phone}
                                </p>
                              </div>
                            </div>
                            {/* Stacking address details below name and phone on small screens */}
                            <div className="sm:flex sm:flex-col sm:items-end mt-3 sm:mt-0">
                              <p className="text-sm leading-6 text-gray-900">
                                {address.street}, {address.city},{" "}
                                {address.state}
                              </p>
                              <p className="text-xs leading-5 text-gray-500">
                                {address.pincode}
                              </p>
                            </div>
                          </li>
                        );
                      })
                    ) : (
                      <p className="mt-1 text-xl leading-6 text-red-600 text-center">
                        Add an address to make an order
                      </p>
                    )}
                  </ul>

                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-sm font-semibold leading-6 text-gray-900">
                        Payment Methods
                      </legend>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Choose your preferred payment method
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="cash"
                            type="radio"
                            name="paymentmethods"
                            onChange={handlePayment}
                            checked={paymentMethod === "cash"}
                            value="cash"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="cash"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cash
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="card"
                            value="card"
                            name="paymentmethods"
                            type="radio"
                            checked={paymentMethod === "card"}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            onChange={handlePayment}
                          />
                          <label
                            htmlFor="push-email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Card
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className=" lg:col-span-2 ">
            <div className="mx-auto bg-white max-w-4xl mt-12  sm:px-6 lg:px-2">
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <h1 className="lg:text-4xl md:text-3xl text-2xl  my-5 font-bold tracking-tight text-gray-900">
                  Cart
                </h1>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {items.map((product) => (
                      <li key={product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={product.product.images[0]}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={product.product.href}>
                                  {product.product.title}
                                </a>
                              </h3>
                              <p className="ml-4">
                                ${Math.round((product.product.price * 100) / 100)}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.product.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className=" text-gray-500">
                              <label
                                htmlFor="quantity"
                                className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                              >
                                Quantity:
                              </label>
                              <select
                                onChange={(e) => handleQuantity(e, product)}
                                value={product.quantity}
                                name="quantity"
                                id="quantity"
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                              </select>
                            </div>

                            <div className="flex">
                              <button
                                onClick={(e) => handleDelete(e, product.id)}
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex  justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>${totalAmount}
                </div>
                <div className="flex my-2 justify-between text-base font-medium text-gray-900">
                  <p>Total Items</p>
                  <p>{totalItems} Items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6 ">
                  <button
                    onClick={!isPlacingOrder ? handleOrder : undefined}
                    disabled={isPlacingOrder}
                    className={`flex items-center justify-center rounded-md border border-transparent px-6 py-3 w-full text-base font-medium text-white shadow-sm ${
                      isPlacingOrder
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                    }`}
                  >
                    {isPlacingOrder ? "Placing Order..." : "Order Now"}
                  </button>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{" "}
                    <Link to="/">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
