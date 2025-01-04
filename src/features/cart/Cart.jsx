import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  deleteItemFromCartAsync,
  selectCartLoaded,
  selectProductsByUserId,
  updateCartAsync,
} from "./cartSlice";
import Modal from "../common/Modal";
function Cart() {
  const items = useSelector(selectProductsByUserId);
  const cartLoaded = useSelector(selectCartLoaded)
  //TODO: amount must be greater than 50 
  const [openModel, setOpenModel] = useState(-1);
  const totalAmount = items.reduce(
    (amount, item) => Math.round(
      item.product.price *
        (1 - item.product.discountPercentage / 100)
    ) * item.quantity + amount,0);
  const totalItems = items.reduce((amount, item) => item.quantity + amount, 0);
  const dispatch = useDispatch();
  function handleQuantity(e, product) {
    dispatch(updateCartAsync({ id:product.product.id, quantity: +e.target.value }));
  }
  function handleDelete( itemId) {
    dispatch(deleteItemFromCartAsync(itemId));
    setOpenModel(-1)
  }
  function toggleModel(productId) {
    if(productId===openModel)
      setOpenModel(-1)
    setOpenModel(productId);
  }

  return (
    <>
      {cartLoaded &&   items.length == 0 && <Navigate to="/" replace="true"></Navigate>}
      <div className="mx-auto bg-white max-w-4xl mt-6 px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
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
                 {openModel===product.id && <Modal
                    dangerTitle={`Deleting -> ${product.product.title}`}
                    dangerDescription={"Do you really want to delete this?"}
                    dangerOption={"Delete"}
                    cancelOption={"Cancel"}
                    dangerAction={()=>handleDelete(product.product.id)}
                    toggleModel = {toggleModel}
                  ></Modal>}
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={product.product.href}>{product.product.title}</a>
                        </h3>
                        <p className="ml-4">${Math.round(
                              product.product.price *
                                (1 - product.product.discountPercentage / 100)
                            )}</p>
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
                          onClick={()=>toggleModel(product.id)}
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
            <p>Subtotal</p>${Math.round(totalAmount * 100) / 100}
          </div>
          <div className="flex my-2 justify-between text-base font-medium text-gray-900">
            <p>Total Items</p>
            <p>{totalItems} Items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{" "}
              <Link to="/">
                <button
                  type="button"
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
    </>
  );
}

export default Cart;
