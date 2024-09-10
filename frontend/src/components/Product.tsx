import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "react-toastify";
import axios from "axios";

interface ProductProps {
  product: {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  };
  onFetchProducts: () => void;
}

const Product: React.FC<ProductProps> = ({ product, onFetchProducts }) => {
  const truncatedDescription =
    product.description.length > 90
      ? `${product.description.substring(0, 90)}...`
      : product.description;
  const truncatedTitle =
    product.title.length > 50
      ? `${product.description.substring(0, 50)}...`
      : product.title;

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "text-yellow-500" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  const deleteProduct = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/product/${product._id}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Product deleted successfully!");
        onFetchProducts();
      }
    } catch (error: any) {
      console.error("Error deleting product:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to delete product.");
      }
    }
  };

  return (
    <Card className="w-full mx-auto   border border-gray-200 ">
      <CardContent className="px-4 py-2 ">
        <div className="justify-end flex">
          <DropdownMenu>
            <DropdownMenuTrigger className="p-1">...</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="text-red-500">
                <button onClick={deleteProduct}>Delete</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <img
          src={product.image}
          alt={product.title}
          className="object-contain h-48 w-full"
        />
        <h2 className="text-lg mt-3  h-20 font-semibold hover:underline">
          {truncatedTitle}
        </h2>

        <p className="text-sm  h-20 text-muted-foreground mb-1">
          {truncatedDescription}
        </p>
        <div className="flex items-center space-x-1">
          {renderStars(Math.round(product.rating?.rate))}
          <p className="text-xs text-muted-foreground ml-2">
            ({product.rating?.count})
          </p>
        </div>
        <div className="mt-4 flex items-end h-full">
          <span className="text-xl font-bold text-gray-900">
            ${product.price}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Product;
