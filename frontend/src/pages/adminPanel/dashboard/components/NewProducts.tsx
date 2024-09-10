import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

export default function NewProducts() {
  const [newProducts, setnewProducts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchLatestProducts = async (): Promise<any> => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/product/latest`,
        {
          withCredentials: true,
        }
      );
      console.log("response", response);
      if (response.status === 200) {
        setnewProducts(response.data);
      }
    } catch (error: any) {
      console.error("Error fetching latest products:", error);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error fetching latest products:");
      }

      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestProducts();
  }, []);

  return (
    <div className="w-full lg:w-1/3 bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Recently Added Products</h2>
      </div>
      <div className="p-4">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          newProducts.map((product: any, index: any) => (
            <div key={index} className="flex items-center gap-4 mb-4">
              <div className="w-14 m-2 h-14 bg-gray-200 rounded-md overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium">
                  {product.title.length > 25
                    ? product.title.slice(0, 25) + "..."
                    : product.title}
                </h3>
              </div>
              <div className="text-orange-500 font-bold">${product.price}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
