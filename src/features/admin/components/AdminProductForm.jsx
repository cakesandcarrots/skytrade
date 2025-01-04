import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductAsync,
  fetchProductByIdAsync,
  resetProduct,
  selectAllBrands,
  selectAllCategories,
  selectItemFetchedStatus,
  selectProductById,
  updateProductAsync,
} from "../../product/ProductSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../../common/Modal";
import { HashLoader } from "react-spinners";
import { useNavigationType } from "react-router-dom";
import { compose } from "@reduxjs/toolkit";
export default function AdminProductForm() {
  //TODO: once the jwt expires logout the user
  const dispatch = useDispatch();
  const colors = [
    {
      name: "White",
      class: "bg-white",
      selectedClass: "ring-gray-400",
      id: "white",
    },
    {
      name: "Gray",
      class: "bg-gray-200",
      selectedClass: "ring-gray-400",
      id: "gray",
    },
    {
      name: "Black",
      class: "bg-gray-900",
      selectedClass: "ring-gray-900",
      id: "black",
    },
  ];
  const sizes = [
    { name: "XXS", inStock: true, id: "xxs" },
    { name: "XS", inStock: true, id: "xs" },
    { name: "S", inStock: true, id: "s" },
    { name: "M", inStock: true, id: "m" },
    { name: "L", inStock: true, id: "l" },
    { name: "XL", inStock: true, id: "xl" },
    { name: "2XL", inStock: true, id: "2xl" },
    { name: "3XL", inStock: true, id: "3xl" },
  ];
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const params = useParams();
  const item = useSelector(selectProductById);
  const itemFetched = useSelector(selectItemFetchedStatus);
console.log(item)
  useEffect(() => {
    if (item) {
      setValue("title", item.title);
      setValue("description", item.description);
      setValue("category", item.category);
      setValue("price", item.price);
      setValue("discountPercentage", item.discountPercentage);
      setValue("rating", item.rating);
      setValue("stock", item.stock);
      setValue("brand", item.brand);
      setValue("image", item.images[0]);
      setValue("thumbnail", item.thumbnail);
      setValue(
        "colors",
        item.colors.map((color) => color.id)
      )
      setValue(
        "sizes",
        item.sizes.map((size) => size.id)
      );
    } else if (params && params.id) dispatch(fetchProductByIdAsync(params.id));
  }, [item, params]);
  const brands = useSelector(selectAllBrands);
  const categories = useSelector(selectAllCategories);
  const navigate = useNavigate();
  const handleCancel = () => {
    reset();
    dispatch(resetProduct());
    navigate("/admin");
  };
  const [openModal, setOpenModal] = useState(-1);
  const toggleModel = (productId) => {
    if (productId === openModal) setOpenModal(-1);
    else setOpenModal(productId);
  };
  const handleDelete = () => {
    const product = { ...item, deleted: true };
    setOpenModal(-1);

    dispatch(updateProductAsync(product));
  };

  return (
    // {
    //   "id": "1", done
    //   "title": "Essence Mascara Lash Princess",done
    //   "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.", done
    //   "category": "beauty",done
    //   "price": 9.99,done
    //   "discountPercentage": 7.17,done
    //   "rating": 4.94,done
    //   "stock": 5,done
    //   "brand": "Essence",done
    //   "images": [
    //     "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png"
    //   ],done
    //   "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png" done
    // }

    <>
      {itemFetched ? (
        <form
          onSubmit={handleSubmit(async (data) => {
            const product = { ...data, rating: 0 };
            product.colors = product.colors.map((colorid) =>
              colors.find((clr) => clr.id == colorid)
            );

            product.sizes = product.sizes.map((sizeid) =>
              sizes.find((sze) => sze.id == sizeid)
            );


            product.price = +product.price;
            product.stock = +product.stock;
            product.images = [product.image];
            delete product.image;
            if(product.colors.length==0)
              delete product.colors
            if(product.sizes.length==0)
              delete product.sizes

            if (params.id) {
              product.id = item.id;
              product.rating = item.rating;
              await dispatch(updateProductAsync(product));
            } else {
              await dispatch(createProductAsync(product));
            }
            await dispatch(resetProduct());
            reset();
            navigate("/admin");
          })}
        >
          <div className="space-y-12 bg-white p-6 md:p-12 rounded ">
            <div className="border-b border-gray-900/10 pb-12">
              {item && item.deleted == true && (
                <p className="text-red-600 font-bold">
                  This product has been deleted
                </p>
              )}
              <h2 className="text-base/7 font-semibold text-gray-900">
                Add Product Details
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
                <div className="sm:col-span-6">
                  <label
                    htmlFor="title"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <input
                      id="title"
                      {...register("title", {
                        required: "Product title is required",
                      })}
                      type="text"
                      className="block w-full min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                    {errors.title && (
                      <p className="text-red-600">{errors.title.message}</p>
                    )}
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="description"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      {...register("description", {
                        required: "Product description is required",
                      })}
                      rows={3}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      defaultValue={""}
                    />
                    {errors.description && (
                      <p className="text-red-600">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="price"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Price
                  </label>
                  <div className="mt-2">
                    <input
                      id="price"
                      {...register("price", {
                        required: "Product price is required",
                        min: { value: 1, message: "Minimum value is 1" },
                        max: { value: 1000, message: "Maximum value is 1000" },
                      })}
                      max
                      type="number"
                      className="block w-full min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                    {errors.price && (
                      <p className="text-red-600">{errors.price.message}</p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="discount"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Discount Percentage
                  </label>
                  <div className="mt-2">
                    <input
                      id="discount"
                      {...register("discountPercentage", {
                        required: "Discount is required",
                        min: { value: 0, message: "Minimum value is 0" },
                        max: { value: 100, message: "Maximum value is 100" },
                      })}
                      step="0.01"
                      type="number"
                      className="block w-full min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                    {errors.discount && (
                      <p className="text-red-600">{errors.discount.message}</p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="stock"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Stock
                  </label>
                  <div className="mt-2">
                    <input
                      id="stock"
                      {...register("stock", {
                        required: "Stock data is required",
                        min: { value: 1, message: "Minimum value is 1" },
                        max: {
                          value: 10000,
                          message: "Maximum value is 10000",
                        },
                      })}
                      type="number"
                      className="block w-full min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                    {errors.stock && (
                      <p className="text-red-600">{errors.stock.message}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 my-5">
                <div className="col-span-2">
                  <label className="block text-sm/6 font-medium text-gray-900 my-2">
                    Category Name
                  </label>
                  <select
                    className="w-full"
                    {...register("category", {
                      required: "Category is required",
                    })}
                  >
                    <option value="">Choose Category</option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-600">{errors.category.message}</p>
                  )}
                </div>
                <div className="col-span-2">
                  <label className=" my-2 block text-sm/6 font-medium text-gray-900">
                    Brand Name
                  </label>
                  <select
                    className="w-full"
                    {...register("brand", { required: "Brand is required" })}
                  >
                    <option value="">Choose Brand</option>
                    {brands.map((brand) => (
                      <option key={brand.value} value={brand.value}>
                        {brand.label}
                      </option>
                    ))}
                  </select>
                  {errors.brand && (
                    <p className="text-red-600">{errors.brand.message}</p>
                  )}
                </div>
                <div className="col-span-2">
                  <label className=" my-2 block text-sm/6 font-medium text-gray-900">
                    Colors
                  </label>

                  {colors.map((color, index) => (
                    <label className="pl-2" key={color.id}>
                      <input
                        type="checkbox"
                        {...register("colors")}
                        value={color.id}
                      />
                      <span className="pl-1 align-middle">{color.name}</span>
                    </label>
                  ))}
                  <label className=" my-2 block text-sm/6 font-medium text-gray-900">
                    Sizes
                  </label>
                  {sizes.map((size, index) => (
                    <label className="pl-2" key={size.id}>
                      <input
                        type="checkbox"
                        {...register("sizes")}
                        value={size.id}
                      />
                      <span className="pl-1 align-middle">{size.name}</span>
                    </label>
                  ))}

                  {errors.brand && (
                    <p className="text-red-600">{errors.brand.message}</p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-6 my-6">
                <label
                  htmlFor="image"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Image
                </label>
                <div className="mt-2">
                  <input
                    id="image"
                    {...register("image", { required: "Image is required" })}
                    type="text"
                    className="block w-full min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 focus:outline focus:outline-0 sm:text-sm/6"
                  />
                  {errors.image && (
                    <p className="text-red-600">{errors.image.message}</p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-6 my-6">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Thumbnail
                </label>
                <div className="mt-2">
                  <input
                    id="thumbnail"
                    {...register("thumbnail", {
                      required: "Thumbnail is required",
                    })}
                    type="text"
                    className="block w-full min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 focus:outline focus:outline-0 sm:text-sm/6"
                  />
                  {errors.thumbnail && (
                    <p className="text-red-600">{errors.thumbnail.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm/6 font-semibold text-gray-900 cursor-pointer"
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
            {item && openModal === item.id && (
              <Modal
                dangerTitle={`Deleting -> ${item.title}`}
                dangerDescription={"Do you really want to delete this?"}
                dangerOption={"Delete"}
                cancelOption={"Cancel"}
                dangerAction={handleDelete}
                toggleModel={() => toggleModel(item.id)}
              ></Modal>
            )}
            {item && item.deleted != true && (
              <button
                type="button"
                onClick={() => toggleModel(item.id)}
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Delete
              </button>
            )}
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <HashLoader color="rgba(74, 0, 128, 1)" size={50} />
        </div>
      )}
    </>
  );
}
