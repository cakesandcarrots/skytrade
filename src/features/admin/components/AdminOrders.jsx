import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import {
  fetchAllOrdersAsync,
  selectAllOrders,
  selectOrderCount,
} from "../../order/orderSlice";
import { ITEMS_PER_PAGE } from "../../../app/constants";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";

function Pagination({ page, handlePage, totalItems }) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  if (totalPages <= 1) return null;

  return (
    <>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between md:hidden">
          <button
            onClick={() => handlePage(page > 1 ? page - 1 : page)}
            disabled={page <= 1}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => handlePage(page < totalPages ? page + 1 : page)}
            disabled={page >= totalPages}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <div className="hidden md:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {(page - 1) * ITEMS_PER_PAGE + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {page * ITEMS_PER_PAGE > totalItems
                  ? totalItems
                  : page * ITEMS_PER_PAGE}
              </span>{" "}
              of <span className="font-medium">{totalItems}</span> results
            </p>
          </div>
          <div>
            <nav
              aria-label="Pagination"
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            >
              <button
                onClick={() => handlePage(page > 1 ? page - 1 : page)}
                disabled={page <= 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
              </button>
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePage(index + 1)}
                  aria-current={page === index + 1 ? "page" : undefined}
                  className={`relative cursor-pointer z-10 inline-flex items-center ${
                    index + 1 === page
                      ? "bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                  } px-4 py-2 text-sm font-semibold focus:z-20`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePage(page < totalPages ? page + 1 : page)}
                disabled={page >= totalPages}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

function AdminOrders() {
  const orders = useSelector(selectAllOrders);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [toggle, setToggle] = useState(0);
  const totalOrders = useSelector(selectOrderCount);

  useEffect(() => {
    const pagination = { _page: page, _per_page: ITEMS_PER_PAGE };
    const sort = toggle === 1 ? "totalAmount" : "-totalAmount";
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [page, toggle, dispatch]);

  const handlePage = (newPage) => {
    setPage(newPage);
  };

  const handleSort = () => {
    setToggle((prevToggle) => (prevToggle === 0 ? 1 : 0));
    setPage(1);
  };

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      {orders && orders.data && totalOrders ? (
        <div className="w-full overflow-x-auto bg-white">
          <div className="min-w-[800px] p-4">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left whitespace-nowrap">
                    Order ID
                  </th>
                  <th className="py-3 px-6 text-left whitespace-nowrap">
                    Items
                  </th>
                  <th
                    onClick={handleSort}
                    className="py-3 px-6 text-center cursor-pointer whitespace-nowrap"
                  >
                    Total Amount{" "}
                    {toggle === 1 ? (
                      <ArrowUpIcon className="inline w-4 h-4" />
                    ) : (
                      <ArrowDownIcon className="inline w-4 h-4" />
                    )}
                  </th>
                  <th className="py-3 px-6 text-center whitespace-nowrap">
                    Shipping Address
                  </th>
                  <th className="py-3 px-6 text-center whitespace-nowrap">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders.data.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
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
                        <div>{order.selectedAddress.name}</div>
                        <div>{order.selectedAddress.street},</div>
                        <div>{order.selectedAddress.city},</div>
                        <div>{order.selectedAddress.state},</div>
                        <div>{order.selectedAddress.pincode}</div>
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
          <Pagination
            page={page}
            handlePage={handlePage}
            totalItems={totalOrders}
          />
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
