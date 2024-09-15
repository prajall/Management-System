import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Products = ({ sortField }: { sortField: string }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/product`,
        {
          params: {
            page: currentPage,
            limit: 15,
            sort: sortField,
          },
        }
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
  }, [currentPage, sortField]);

  return (
    <div>
      <div className="w-[94vw] sm:w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">SNo.</TableHead>
              <TableHead>Image</TableHead>
              <TableHead className="min-w-[200px] lg:pr-4">Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              products.map((product, index) => (
                <TableRow key={product._id}>
                  <TableCell className="w-10">{index + 1}</TableCell>
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-10 h-10 object-cover"
                    />
                  </TableCell>
                  <TableCell className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {product.title}
                  </TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.rating.rate.toFixed(1)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

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
