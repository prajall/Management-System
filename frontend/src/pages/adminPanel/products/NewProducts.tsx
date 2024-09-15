import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Image, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const NewProducts = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log("data", data);

    if (selectedImages.length <= 0) {
      setError("images", {
        message: "At least one image is required",
      });
      return;
    }

    try {
      const formData = new FormData();
      console.log("Title:", data.title);
      console.log("Description:", data.description);
      console.log("Base Price:", data.basePrice);
      console.log("Selected Images:", selectedImages);

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("basePrice", data.basePrice.toString());

      selectedImages.forEach((image) => {
        formData.append("images", image);
      });

      console.log("FormData entries:", Array.from(formData.entries()));

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log("response", response);
      if (response.status === 200) {
        toast.success("Product added successfully");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error adding product");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      if (selectedImages.length + filesArray.length <= 4) {
        setSelectedImages((prevImages) => [...prevImages, ...filesArray]);
      } else {
        toast.error("You can only upload up to 4 images.");
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  useEffect(() => {
    console.log("selectedImages", selectedImages);
    setValue("images", selectedImages);
    if (selectedImages.length > 0) {
      console.log("inside if in useeffe");
      clearErrors("images");
    }
    console.log("watch images", watch("images"));
  }, [selectedImages, setSelectedImages]);

  return (
    <div className="flex-1 overflow-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Product Title</Label>

              <Input
                {...register("title", {
                  required: "Product Title is required",
                })}
                className="mt-1"
                id="title"
                placeholder="Enter product title"
              />
              {errors.title && (
                <p className="text-red-500">
                  {errors.title.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <Label>Product Description</Label>
              <Textarea
                {...register("description", {
                  required: "Product Description is required",
                })}
                className="mt-1"
                style={{ resize: "none" }}
                rows={4}
                id="description"
                placeholder="Enter product description"
              />
              {errors.description && (
                <p className="text-red-500">
                  {errors.description.message?.toString()}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Media</CardTitle>
            <CardDescription>
              The images will be cropped to a square format.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 ">
              {selectedImages.map((image, index) => (
                <div
                  key={index}
                  className="relative max-w-1/2 lg:max-w-1/4 group "
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Product ${index + 1}`}
                    className="w-full aspect-square object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center p-1"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
            <Input
              type="file"
              accept="image/*"
              multiple
              {...register("images")}
              onChange={handleImageChange}
              className="w-full hidden"
              id="images-input"
            />
            {errors.images && (
              <p className="text-red-500 mb-2">
                {errors.images.message?.toString()}
              </p>
            )}
            {selectedImages.length < 4 && (
              <Button
                variant={"outline"}
                type="button"
                onClick={() => {
                  document.getElementById("images-input")?.click();
                }}
                className={`${selectedImages.length === 4 ? "hidden" : ""} ${
                  selectedImages.length === 0 ? "mt-0" : "mt-4"
                } bg-gray-50 hover:bg-gray-100 flex items-center gap-2`}
              >
                <Image size={16} />
                Upload Images
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <div className="w-1/2">
              <Label htmlFor="basePrice">Base Price</Label>
              <Input
                {...register("basePrice", {
                  required: "Base Price is required",
                })}
                className="mt-1 w-full"
                id="basePrice"
                type="number"
                placeholder="Enter base price"
              />

              {errors.basePrice && (
                <p className="text-red-500">
                  {errors.basePrice.message?.toString()}
                </p>
              )}
            </div>
            <div className="w-1/2">
              <Label htmlFor="discountPercentage">
                Discount Percentage (%){" "}
                <span className="text-muted-foreground text-xs">
                  (optional)
                </span>
              </Label>

              <Input
                {...register("discountPercentage")}
                className="mt-1 w-full"
                id="discountPercentage"
                type="number"
                placeholder="Enter discount percentage"
              />
              {errors.discountPercentage && (
                <p className="text-red-500">
                  {errors.discountPercentage.message?.toString()}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader>
            <CardTitle>Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="productCategory">Product Category</Label>
              <Controller
                name="productCategory"
                control={control}
                rules={{ required: "Product Category is required" }}
                render={({ field }) => (
                  <Select {...field}>
                    <SelectTrigger id="productCategory" className="mt-1">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="books">Books</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.productCategory && (
                <p className="text-red-500">
                  {errors.productCategory.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <Label>Product Tags</Label>
              <Controller
                name="productTags"
                control={control}
                rules={{ required: "Product Tags are required" }}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    defaultValue="option-one"
                    className="mt-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label htmlFor="option-one">Clothing</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two">Toys</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-three" id="option-three" />
                      <Label htmlFor="option-three">Internet Of Things</Label>
                    </div>
                  </RadioGroup>
                )}
              />
              {errors.productTags && (
                <p className="text-red-500">
                  {errors.productTags.message?.toString()}
                </p>
              )}
            </div>
          </CardContent>
        </Card> */}

        <Button
          type="submit"
          onClick={() => {
            if (selectedImages.length <= 0) {
              setError("images", {
                message: "At least one image is required",
              });
              return;
            }
          }}
          className="bg-primary hover:bg-secondary"
        >
          Add Product
        </Button>
      </form>
    </div>
  );
};

export default NewProducts;
