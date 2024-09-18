import { AppContext } from "@/contexts/Appcontext";
import Sidebar from "@/pages/adminPanel/components/Sidebar";
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Settings from "./administration/Settings";
import Dashboard from "./dashboard/Dashboard";
import ManageUsers from "./human-resource/Employees";
import RoleManagement from "./human-resource/RoleManagement";
import Areas from "./master/Areas";
import Cities from "./master/Cities";
import Countries from "./master/Countries";
import EditProduct from "./products/EditProduct";
import NewProduct from "./products/NewProduct";
import ProductsPage from "./products/ProductsPage";
import AddEmployee from "./human-resource/AddEmployee";

const MainPage = () => {
  console.log("MainPage");
  const { isLoadingAppData } = useContext(AppContext);

  if (isLoadingAppData) {
    return (
      <div className="fixed z-[9999] top-0 left-0 w-screen h-screen flex justify-center items-center">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar for desktop */}
      <div className="hidden lg:block md:fixed  left-0 top-0 w-56 xl:w-60 bg-white">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-56 xl:ml-60 flex flex-col">
        <div className=" w-full overflow-hidden p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<ManageUsers />} />
            <Route path="/roles-permissions" element={<RoleManagement />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/cities" element={<Cities />} />
            <Route path="/areas" element={<Areas />} />
            <Route path="/products/*" element={<ProductsPage />} />
            <Route path="/products/new" element={<NewProduct />} />
            <Route path="/products/edit/:productId" element={<EditProduct />} />
            <Route path="/employees/new" element={<AddEmployee />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MainPage);
