import ProductForm from "@/components/ProductForm";
import { AppContext } from "@/contexts/Appcontext";
import { checkPermission } from "@/lib/utils";
import { useContext, useEffect } from "react";
import { redirect } from "react-router-dom";

const NewProduct = () => {
  const { appData } = useContext(AppContext);
  useEffect(() => {
    if (!checkPermission(appData?.userRole, "Product", "Add"))
      redirect("/manage-products");
  }, []);
  return (
    <div>
      <ProductForm />
    </div>
  );
};

export default NewProduct;
