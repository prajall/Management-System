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
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Image, Loader2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
const EditProduct = () => {
  const { productId } = useParams();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [variations, setVariations] = useState<string[]>([]);
  const [variationInput, setVariationInput] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm();

  const fetchProductDetails = async (): Promise<any> => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/product/${productId}`,
        {
          withCredentials: true,
        }
      );
      console.log("product", response.data);
      if (response.status === 200) {
        const productData = response.data;
        setValue("title", productData.title);
        setValue("description", productData.description);
        setValue("basePrice", productData.basePrice);
        setValue("stock", productData.stock);
        setValue("brand", productData.brand);
        setValue("discountAmount", productData.discountAmount);
        setVariations(productData.variations || []);
        setProductImages(productData.images || []);
      }
    } catch (error: any) {
      console.error("Error fetching product details:", error);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error fetching product details:");
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    setIsSubmitting(true);
    console.log("Updating Data: ", data);

    if (selectedImages.length + productImages.length <= 0) {
      setError("images", {
        message: "At least one image is required",
      });
      return;
    }

    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("basePrice", data.basePrice.toString());
      formData.append("stock", data.stock.toString());
      formData.append("brand", data.brand);
      formData.append("discountAmount", data.discountAmount.toString());
      formData.append("variations", data.variations);

      variations.forEach((variation: string) => {
        formData.append("variations", variation);
      });

      //existing images. Update directly in db
      productImages.forEach((image) => {
        formData.append("productImages", image);
      });

      //new images. Upload to cloudinary and get the url
      selectedImages.forEach((image) => {
        formData.append("images", image);
      });

      console.log("FormData entries:", Array.from(formData.entries()));

      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/product/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("Product updated successfully!");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error updating product");
    } finally {
      setIsSubmitting(false);
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

  const handleRemoveSelectedImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleRemoveProductImage = (index: number) => {
    setProductImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    setValue("images", selectedImages);
    if (selectedImages.length > 0) {
      clearErrors("images");
    }
  }, [selectedImages, setSelectedImages]);

  if (loading) return <Loader2 className="animate-spin" size={32} />;

  return (
    <div className="flex-1 overflow-auto">
      <Header pageTitle="Edit Product" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-16">
        <Card>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-1/2 space-y-4">
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
                  <p className="text-red-500 text-xs mt-1">
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
                  rows={7}
                  id="description"
                  placeholder="Enter product description"
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description.message?.toString()}
                  </p>
                )}
              </div>
            </div>

            <div className="w-full lg:w-1/2 space-y-4">
              <div>
                <Label htmlFor="stock">Stock</Label>
                <Input
                  {...register("stock", {
                    required: "Stock is required",
                  })}
                  className="mt-1"
                  id="stock"
                  type="number"
                  placeholder="Enter stock quantity"
                />
                {errors.stock && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.stock.message?.toString()}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="brand">Brand/Manufacturer</Label>
                <Input
                  {...register("brand", {
                    required: "Brand/Manufacturer is required",
                  })}
                  className="mt-1"
                  id="brand"
                  placeholder="Enter brand or manufacturer"
                />
                {errors.brand && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.brand.message?.toString()}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="variations">
                  Variations{" "}
                  <span className="text-muted-foreground text-xs">
                    (optional)
                  </span>
                </Label>
                {variations.length > 0 && (
                  <div className="flex gap-2 my-2 flex-wrap">
                    {variations.map((variation, index) => (
                      <div
                        className="flex items-center gap-1 bg-gray-200 px-2 pl-3 py-1 rounded-full "
                        key={index}
                      >
                        <p className="text-sm">{variation}</p>
                        <button
                          type="button"
                          className="p-1"
                          onClick={() =>
                            setVariations(
                              variations.filter((_, i) => i !== index)
                            )
                          }
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 mt-1">
                  <Input
                    {...register("variations")}
                    id="variations"
                    placeholder="Enter product variations: Size/Colour/Material etc."
                    value={variationInput}
                    onChange={(e) => {
                      setVariationInput(e.target.value);
                      clearErrors("variations");
                    }}
                  />
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      if (variationInput.trim() === "") {
                        setError("variations", {
                          message: "Variation is required",
                        });
                        return;
                      }
                      setVariations([...variations, variationInput]);
                      setVariationInput("");
                    }}
                  >
                    Add
                  </Button>
                </div>
                {errors.variations && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.variations.message?.toString()}
                  </p>
                )}
              </div>
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {productImages.map((image, index) => (
                <div
                  key={index}
                  className="relative max-w-1/2 lg:max-w-1/4 group"
                >
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className={`w-full aspect-square object-cover rounded `}
                  />
                  {index === 0 && (
                    <div className="absolute top-2 left-2 bg-white/70 backdrop-blur-sm rounded p-1 px-2">
                      <p
                        title="This image will be used as the main image of the product"
                        className="text-xs font-semibold"
                      >
                        Base Image
                      </p>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveProductImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center p-1"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              {selectedImages.map((image, index) => (
                <div
                  key={index}
                  className="relative max-w-1/2 lg:max-w-1/4 group"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Product ${index + 1}`}
                    className={`w-full aspect-square object-cover rounded `}
                  />
                  {productImages.length === 0 && index === 0 && (
                    <div className="absolute top-2 left-2 bg-white/70 backdrop-blur-sm rounded p-1 px-2">
                      <p
                        title="This image will be used as the main image of the product"
                        className="text-xs font-semibold"
                      >
                        Base Image
                      </p>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveSelectedImage(index)}
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
              <Label htmlFor="discountAmount">
                Discount Amount ($){" "}
                <span className="text-muted-foreground text-xs">
                  (optional)
                </span>
              </Label>

              <Input
                {...register("discountAmount")}
                className="mt-1 w-full"
                id="discountAmount"
                type="number"
                placeholder="Enter discount amount"
              />
              {errors.discountAmount && (
                <p className="text-red-500">
                  {errors.discountAmount.message?.toString()}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

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
          disabled={isSubmitting}
          className="bg-primary w-full hover:bg-secondary flex items-center justify-center gap-1"
        >
          {isSubmitting && <Loader2 className="mr-2 animate-spin" size={16} />}
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default EditProduct;
