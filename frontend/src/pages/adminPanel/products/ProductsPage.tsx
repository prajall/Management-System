import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppContext } from "@/contexts/Appcontext";
import { checkPermission } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Products from "./components/Products";
import SearchForm from "./components/SearchForm";
import SearchResults from "./SearchResults";

const ProductsPage = React.memo(() => {
  console.log("ProductsPage");

  const { appData } = useContext(AppContext);

  const [sortField, setSortField] = useState<string>("title");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const handleSearch = useCallback(
    async (searchTerm: string) => {
      setCurrentPage(1);

      if (searchTerm === "") {
        toast.error("Please enter a search query");
        return;
      }
      navigate(
        `/admin/products/search?searchQuery=${searchTerm}&currentPage=${1}`
      );
    },
    [currentPage, navigate]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [sortField]);

  return (
    <>
      <Header
        pageTitle="Products"
        addFunction={() => {
          navigate("/admin/products/new");
        }}
        buttonText={<PlusIcon size={16} />}
      />
      <div className="mb-4 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          {/* <Header title="Products" description="Manage your Products" /> */}
          {checkPermission(appData?.userRole, "Product", "Add") && (
            <Link to="/admin/products/new">
              <Button className="bg-primary hover:bg-secondary">
                Add Product
              </Button>
            </Link>
          )}
        </div>
        <div className="flex items-center gap-2 w-full">
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
          <SearchForm handleSearch={handleSearch} />
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Products sortField={sortField} />} />

        <Route
          path="/search"
          element={<SearchResults sortField={sortField} />}
        />
      </Routes>
    </>
  );
});

export default ProductsPage;
