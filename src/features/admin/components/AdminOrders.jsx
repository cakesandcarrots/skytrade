import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import {
  fetchAllOrdersAsync,
  selectAllOrders,
  selectOrderCount,
} from "../../order/orderSlice";
import { ITEMS_PER_PAGE } from "../../../app/constants";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/20/solid";

function AdminOrders() {
  const orders = useSelector(selectAllOrders);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [toggle, setToggle] = useState(0);

  useEffect(() => {
    const pagination = { _page: page, _per_page: ITEMS_PER_PAGE };
    const sort = toggle == 1 ? "totalAmount" : "-totalAmount";
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [page, toggle]);

  const totalOrders = useSelector(selectOrderCount);
  
  const handleSort = (e) => {
    setToggle(!toggle);
  };

  return (
    <div className="w-full bg-gray-100">
      {orders.length != 0 ? (
        // Full-width container with background
        <div className="w-full overflow-x-auto bg-white">
          {/* Content wrapper with minimum width and padding */}
          <div className="min-w-[800px] p-4">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left whitespace-nowrap">Order ID</th>
                  <th className="py-3 px-6 text-left whitespace-nowrap">
                    Items
                  </th>
                  <th onClick={handleSort} className="py-3 px-6 text-center cursor-pointer whitespace-nowrap">
                    Total Amount{" "}
                    {toggle == 1 ? (
                      <ArrowDownIcon className="inline w-4 h-4" />
                    ) : (
                      <ArrowUpIcon className="inline w-4 h-4" />
                    )}
                  </th>
                  <th className="py-3 px-6 text-center whitespace-nowrap">
                    Shipping Address
                  </th>
                  <th className="py-3 px-6 text-center whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders.data.map((order) => (
                  <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-medium">#{order.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <div className="mr-2">
                            <img
                              className="w-6 h-6 rounded-full"
                              src={item.product.images[0]}
                              alt={item.product.title}
                            />
                          </div>
                          <span className="whitespace-nowrap">
                            {item.product.title} --#{item.quantity}--$
                            {Math.round(
                              item.product.price *
                                (1 - item.product.discountPercentage / 100)
                            )}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-6 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center">
                        <div className="font-bold">
                          ${Math.round(order.totalAmount)}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="whitespace-nowrap">
                        <div>{order.selectedAddress.city},</div>
                        <div>{order.selectedAddress.pincode},</div>
                        <div>{order.selectedAddress.state},</div>
                        <div>{order.selectedAddress.street}</div>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center whitespace-nowrap">
                      <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <HashLoader color="rgba(74, 0, 128, 1)" size={50} />
        </div>
      )}
    </div>
  );
}

export default AdminOrders;