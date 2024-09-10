import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Product from "@/components/Product";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AppContext } from "@/contexts/Appcontext";
import { checkPermission } from "@/lib/utils";

const ManageProducts: React.FC = () => {
  const { appData } = useContext(AppContext);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/product`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center">Loading products...</p>;
  }

  return (
    <>
      {/* <div className="flex justify-between md:gap-4 items-center md:justify-start"> */}
      <div className="">
        <Header title="Products" description="Manage your Products " />
        {checkPermission(appData?.userRole, "Product", "Add") && (
          <Link to="/manage-products/new">
            <Button className="bg-teal-600 hover:bg-teal-500">
              Add Product
            </Button>
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {products.map((product) => (
          <Product
            key={product._id}
            product={product}
            onFetchProducts={fetchProducts}
          />
        ))}
      </div>
    </>
  );
};

export default React.memo(ManageProducts);
