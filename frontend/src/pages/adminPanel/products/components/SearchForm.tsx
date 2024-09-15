import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchForm = ({
  handleSearch,
}: {
  handleSearch: (searchTerm: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("searchQuery");
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [location.search]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(searchTerm);
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
  );
};

export default SearchForm;
