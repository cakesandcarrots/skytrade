import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserOrdersAsync, selectUserInfo, selectUserOrders } from "../userSlice";

function UserOrders() {
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  console.log()
  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync());
  }, []);
  const orders = useSelector(selectUserOrders);

  return (
    <>
      {orders ? orders.map((order) => {  return (
        <div key={order.id} className="mx-auto pb-5 bg-white max-w-4xl mt-6 px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl mt-5 font-bold tracking-tight text-gray-900">
              Items in Order ID:{order.id}
            </h1>
            <h3 className=" my-3 font-bold tracking-tight text-red-900">
              Status:{order.status}
            </h3>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {order.items.map((item) => (
                  <li  className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.product.images[0]}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <p>{item.product.title}</p>
                          </h3>
                          <p className="ml-4">${item.product.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.product.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className=" text-gray-500">
                          <div className="inline mr-5 text-sm font-medium leading-6 text-gray-900">
                            Quantity:{item.quantity}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 pb-3 sm:px-6">
            <div className="flex  justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${ Math.round(order.totalAmount* 100) / 100
              }</p>
            </div>
            <div className="flex my-2 justify-between text-base font-medium text-gray-900">
              <p>Total Items</p>
              <p>{order.totalItems} Items</p>
            </div>
            <p className="pt-4 text-md text-black-500">
              Shipping Address:
            </p>
          </div>
          <div className="  flex justify-between border-2 px-5 gap-x-6 py-5 pb-2 ">
            <div className=" pb-4 flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {order?.selectedAddress?.name ? order.selectedAddress.name : "No Name" }
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {order.selectedAddress.phone}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">
                {order.selectedAddress.street},{order.selectedAddress.city},
                {order.selectedAddress.state}
              </p>
              <p className="text-xs leading-5 text-gray-500">
                {order.selectedAddress.pincode}
              </p>
            </div>
          </div>
        </div>
      )}): <div className="flex items-center justify-center h-screen">
      <HashLoader color="rgba(74, 0, 128, 1)" size={50} />
    </div>}
    </>
  );
}

export default UserOrders;
