import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { HashLoader } from "react-spinners";
function UserProfile() {
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const [editPageOfAddressIndex, setEditPageOfAddressIndex] = useState(-1);
  const [newAddressPage, setNewAddressPage] = useState(false);

  const handleEdit = (addressChange, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1, addressChange);
    dispatch(updateUserAsync(newUser));
    setEditPageOfAddressIndex(-1);
  };
  const handleRemove = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };
  const handleNewAddress = (data) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.push(data);
    dispatch(updateUserAsync(newUser));
    setNewAddressPage(false);
  };

  const handleEditForm = (e, index, address) => {
    setEditPageOfAddressIndex(index);
    setNewAddressPage(false);
    if (editPageOfAddressIndex === index) setEditPageOfAddressIndex(-1);
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("phone", address.phone);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pincode", address.pincode);
  };
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  return (
    <>
      {user ? (
        <div className="mx-auto pb-5 bg-white max-w-4xl mt-6 px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl mt-5 font-bold tracking-tight text-gray-900">
              Hello User
            </h1>
            <h3 className=" my-3 font-bold tracking-tight text-red-900">
              Email Address: {user.email}
            </h3>
            <h3 className=" my-3 font-bold tracking-tight text-red-900">
              User Role: {user.role}
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-6 pb-3 sm:px-6">
            <button
              onClick={() => {
                reset();
                setNewAddressPage(true);
                setEditPageOfAddressIndex(-1);
              }}
              className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add New Address{" "}
            </button>
            {newAddressPage ? (
              <form
                className=" bg-white px-5 mt-12"
                onSubmit={handleSubmit((data) => {
                  handleNewAddress(data);
                  reset();
                })}
              >
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
                            onClick={() => {
                              setNewAddressPage(false);
                            }}
                            className="rounded-md bg-slate-300 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Cancel
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
                </div>
              </form>
            ) : null}
            <p className="pt-4 text-md text-black-500">Your Addresses:</p>
            {user.addresses.map((address, index) => (
  <div key={index}>
    <div className="flex flex-col sm:flex-row justify-between border-2 px-5 gap-x-6 py-5 pb-2 my-4">
      <div className="pb-4 flex min-w-0 gap-x-4 flex-col sm:flex-row">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {address.name}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {address.phone}
          </p>
        </div>
      </div>
      
      {/* Stacked address details on small screens, inline on larger screens */}
      <div className="sm:flex sm:flex-col sm:items-end mt-3 sm:mt-0">
        <p className="text-sm leading-6 text-gray-900">
          {address.street}, {address.city}, {address.state}
        </p>
        <p className="text-xs leading-5 text-gray-500">
          {address.pincode}
        </p>
        <button
          onClick={(e) => handleEditForm(e, index, address)}
          type="button"
          className="font-medium text-sm text-indigo-600 hover:text-indigo-500"
        >
          Edit
        </button>
        <button
          onClick={(e) => handleRemove(e, index)}
          type="button"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Remove
        </button>
      </div>
    </div>

    {/* Edit form for the selected address */}
    {editPageOfAddressIndex === index ? (
      <>
        <form
          className="bg-white px-5 mt-12"
          onSubmit={handleSubmit((data) => {
            handleEdit(data, index);
            reset();
          })}
        >
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
                      onClick={() => setEditPageOfAddressIndex(-1)}
                      className="rounded-md bg-slate-300 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </>
    ) : null}
  </div>
))}

          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <HashLoader color="rgba(74, 0, 128, 1)" size={50} />
        </div>
      )}
    </>
  );
}

export default UserProfile;
