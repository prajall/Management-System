import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Product {
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<string>("title");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/product?searchQuery=${searchTerm}&page=${currentPage}&limit=15&sort=${sortField}`
      );
      console.log("products", response.data);
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error fetching products");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // const filteredProducts = products
  //   .filter((product) =>
  //     product.title.toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  //   .sort((a, b) => {
  //     if (sortField === "price01") {
  //       return a.price - b.price;
  //     } else if (sortField === "price10") {
  //       return b.price - a.price;
  //     } else if (sortField === "rating") {
  //       return b.rating.rate - a.rating.rate;
  //     } else {
  //       return a.title.localeCompare(b.title);
  //     }
  //   });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchProducts();
  }, [currentPage, sortField]);

  return (
    <div>
      <div className="mb-4 flex flex-col gap-4">
        <div className="flex items-center lg:flex-row-reverse gap-2 w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setCurrentPage(1);
              fetchProducts();
            }}
            className="flex gap-2 w-full"
          >
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products"
              className="flex-grow w-full"
            />
            <Button type="submit">Search</Button>
          </form>
          <div className="flex gap-2 items-center ml-auto">
            <label
              htmlFor="sort"
              className="text-sm text-gray-500 font-semibold hidden lg:block"
            >
              Sort:
            </label>
            <Select onValueChange={setSortField} value={sortField}>
              <SelectTrigger className="w-[100px] text-xs lg:w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="price01">Price: Low to High</SelectItem>
                <SelectItem value="price10">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">SNo.</TableHead>
            <TableHead>Image</TableHead>
            <TableHead className="min-w-[200px] lg:pr-4">Title</TableHead>
            {/* <TableHead>Description</TableHead> */}
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Rating</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : (
            products.map((product, index) => (
              <TableRow key={index}>
                <TableCell className="w-10">{index + 1}</TableCell>
                <TableCell>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-10 h-10"
                  />
                </TableCell>
                <TableCell className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {product.title}
                </TableCell>
                {/* <TableCell>
                {product.description.length > 30
                  ? `${product.description.substring(0, 30)}...`
                  : product.description}
              </TableCell> */}
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.rating.rate}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className="cursor-pointer"
              />
            </PaginationItem>
          )}
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i + 1}>
              <PaginationLink
                onClick={() => handlePageChange(i + 1)}
                className="cursor-pointer"
                isActive={currentPage === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className="cursor-pointer"
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Products;
