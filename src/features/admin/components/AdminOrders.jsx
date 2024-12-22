import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  }, [page,toggle]);

  const totalOrders = useSelector(selectOrderCount);
  const handleSort = (e) => {
    setToggle(!toggle);
  };
  return (
    <>
      {orders != null ? (
        <div className="overflow-x-auto">
          <div className="min-w-screen  bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
            <div className="w-full lg:w-5/6">
              <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left ">Order ID</th>
                      <th  className="py-3 px-6 text-left">
                        Items
                      </th>
                      <th onClick={handleSort} className="py-3 px-6 text-center">
                        Total Amount{" "}
                        {toggle == 1 ? (
                          <ArrowDownIcon className="inline w-4 h-4"></ArrowDownIcon>
                        ) : (
                          <ArrowUpIcon className="inline w-4 h-4"></ArrowUpIcon>
                        )}
                      </th>
                      <th className="py-3 px-6 text-center">
                        Shipping Address
                      </th>
                      <th className="py-3 px-6 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {orders.data.map((order) => (
                      <tr className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="font-medium">#{order.id}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          {order.items.map((item) => (
                            <div className="flex items-center">
                              <div className="mr-2">
                                <img
                                  className="w-6 h-6 rounded-full"
                                  src={item.images[0]}
                                />
                              </div>
                              <span>
                                {item.title} -#{item.quantity}-$
                                {Math.round(
                                  item.price *
                                    (1 - item.discountPercentage / 100)
                                )}
                              </span>
                            </div>
                          ))}
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center">
                            <div className="font-bold">
                              ${Math.round(order.totalAmount)}
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-6 text-center">
                          <div>{order.selectedAddress.city},</div>
                          <div>{order.selectedAddress.pincode},</div>
                          <div>{order.selectedAddress.state},</div>
                          <div>{order.selectedAddress.street}</div>
                        </td>
                        <td className="py-3 px-6 text-center">
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
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}

export default AdminOrders;
