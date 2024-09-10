import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { useEffect } from "react";
import { redirect } from "react-router-dom";

const ProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/product`,
        {
          title: data.title,
          description: data.description,
          price: parseFloat(data.price),
          category: data.category,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        toast.success("Product added successfully!");
        reset();
        redirect("/manage-products");
      }

      console.log("Response:", response);
    } catch (error: any) {
      console.error("Error adding product:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to add product.");
      }
    }
  };

  useEffect(() => {
    console.log("watch image", watch("image"));
  }, [watch("image")]);

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="font-semibold mb-1 block" htmlFor="title">
            Title
          </label>
          <Input
            id="title"
            {...register("title", { required: "Title is Required" })}
            placeholder="Enter product title"
            className={`${
              errors.title ? "border-red-500" : ""
            } focus:ring-teal-600 focus:ring focus:ring-offset-1 focus:ring-opacity-50`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">
              {errors.title.message?.toString()}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="font-semibold mb-1 block " htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is Required",
            })}
            placeholder="Enter product description"
            className={`${
              errors.description ? "border-red-500" : ""
            } h-40 w-full resize-none p-2 focus:ring-teal-600 focus:ring focus:ring-offset-1 focus:ring-opacity-50 focus:outline-none rounded-md`}
            style={{ resize: "none" }}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message?.toString()}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="font-semibold mb-1 block" htmlFor="price">
            Price
          </label>
          <Input
            id="price"
            type="number"
            step="0.01"
            {...register("price", { required: "Price is Required" })}
            placeholder="Enter product price"
            className={`${errors.price ? "border-red-500" : ""}`}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">
              {errors.price.message?.toString()}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="font-semibold mb-1 block" htmlFor="category">
            Category
          </label>
          <Input
            id="category"
            {...register("category", { required: "Category is Required" })}
            placeholder="Enter product category"
            className={`${errors.category ? "border-red-500" : ""}`}
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message?.toString()}
            </p>
          )}
        </div>
        <div className="mb-4 relative">
          <label className="font-semibold mb-1 block" htmlFor="image">
            Image URL
          </label>
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">
              {errors.image.message?.toString()}
            </p>
          )}
          <div className="flex items-center space-x-2">
            {/* Show the input if there's no image or if there's an error */}
            {(!watch("image") || errors.image) && (
              <label className="block w-full">
                <span className="sr-only">Choose image</span>
                <input
                  id="image"
                  type="file"
                  {...register("image", { required: "Image is Required" })}
                  className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-teal-50 file:text-teal-700
            hover:file:bg-teal-100 focus:outline-none
            focus-visible:ring-2 focus-visible:ring-teal-500
            focus-visible:ring-offset-2 focus-visible:ring-offset-white
            disabled:opacity-50"
                />
              </label>
            )}

            {/* Show image preview when an image is selected and there are no errors */}
            {watch("image") && watch("image").length > 0 && !errors.image && (
              <div className="flex items-center space-x-2 relative">
                <img
                  src={URL.createObjectURL(watch("image")[0])}
                  alt={watch("image")[0].name}
                  className="h-40 w-auto"
                />
                <span className="text-sm font-semibold">
                  {watch("image")[0].name}
                </span>
                <button
                  type="button"
                  className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  onClick={() => reset({ image: null })}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full bg-teal-600 text-white">
          Add Product
        </Button>
      </form>
    </div>
  );
};

export default ProductForm;
