import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { Product } from "@/types";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SearchResults = ({ sortField }: { sortField: string }) => {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  console.log("params", params);
  const searchQuery = params.get("searchQuery") || "";
  const currentPage = Number(params.get("currentPage")) || 1;

  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    navigate(
      `/admin/products/search?searchQuery=${searchQuery}&currentPage=${page}`
    );
  };

  const searchProducts = async () => {
    if (searchQuery === "") {
      toast.error("Please enter a search query");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/product`,
        {
          params: {
            searchQuery: encodeURIComponent(searchQuery),
            page: currentPage,
            limit: 15,
            sort: sortField,
          },
          withCredentials: true,
        }
      );
      console.log("searchResults", response.data);
      setSearchResults(response.data.products);
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

  useEffect(() => {
    searchProducts();
  }, [searchQuery, currentPage, sortField]);

  useEffect(() => {
    // searchProducts();
    console.log("searchQuery", searchQuery);
    console.log("currentPage", currentPage);
    console.log("sortField", sortField);
  }, []);

  return (
    <div>
      <div className="text-xl py-4 font-semibold">
        Search Results for "{searchQuery}"
      </div>
      {searchResults.length === 0 ? (
        <div className="text-center text-gray-500">No results found</div>
      ) : (
        <div className="w-full overflow-x-auto">
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
                searchResults.map((product, index) => (
                  <TableRow key={product._id}>
                    <TableCell className="w-10">{index + 1}</TableCell>
                    <TableCell>
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-10 h-10 object-cover"
                      />
                    </TableCell>
                    <TableCell className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                      {product.title}
                    </TableCell>
                    <TableCell>${product.basePrice.toFixed(2)}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.rating.rate.toFixed(1)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Pagination className="mt-2">
        <PaginationContent>
          <PaginationItem>
            {currentPage > 1 && (
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className="cursor-pointer"
              />
            )}
          </PaginationItem>
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

export default SearchResults;
