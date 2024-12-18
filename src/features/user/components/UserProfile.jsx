import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";

function UserProfile() {
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const handleEdit = (e,index)=>{
    updateUserAsync({
      ...user,
      addresses: [...user.addresses, data],
    })

  }
  const handleRemove = (e,index)=>{

    const newUser = {...user,addresses:[...user.addresses]}
    newUser.addresses.splice(index,1);
    console.log(newUser)
    dispatch(updateUserAsync(newUser))
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  return (
    <>
      {" "}
      <div className="mx-auto pb-5 bg-white max-w-4xl mt-6 px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-4xl mt-5 font-bold tracking-tight text-gray-900">
            {user.name ? user.name : "New User"}
          </h1>
          <h3 className=" my-3 font-bold tracking-tight text-red-900">
            Email Address: {user.email}
          </h3>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 pb-3 sm:px-6">
          <p className="pt-4 text-md text-black-500">Your Addresses:</p>
          {user.addresses.map((address,index) => (
            <div>
            <div  key={ index} className="  flex justify-between border-2 px-5 gap-x-6 py-5 pb-2 my-4 ">
              <div className=" pb-4 flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {address.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {address.phone}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  {address.street},{address.city},{index}
                </p>
                <p className="text-xs leading-5 text-gray-500">
                  {address.pincode}
                </p>
                <button onClick={(e)=>handleEdit(e,index)}
                          type="button"
                          className="font-medium text-sm text-indigo-600 hover:text-indigo-500"
                        >
Edit                        </button>
                        <button onClick={(e)=>handleRemove(e,index)}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
              </div>
            </div>
            <form
              className=" bg-white px-5 mt-12"
              onSubmit={handleSubmit((data) => {
                dispatch(
                 
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
                        <input value={address.name}
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
                        <input value={address.email}
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
                      <input value={address.phone}
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
                        <input value={address.street}
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
                        <input value={address.city}
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
                          id="region" value={address.state}
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
                        <input value={address.pincode}
                          id="postal-code"
                          {...register("pincode", {
                            required: "PIN code can't be empty",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <div className="mt-6 flex items-center justify-end gap-x-6">
                                               <button
                          type="submit"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Edit Address
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </form>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default UserProfile;
