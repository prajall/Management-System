import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/pages/adminPanel/components/Sidebar";
import { Menu } from "lucide-react";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Settings from "./administration/Settings";
import Dashboard from "./dashboard/Dashboard";
import ManageUsers from "./human-resource/Employees";
import RoleManagement from "./human-resource/RoleManagement";
import Areas from "./master/Areas";
import Cities from "./master/Cities";
import Countries from "./master/Countries";
import NewProduct from "./products/NewProduct";
import ProductsPage from "./products/ProductsPage";
import EditProduct from "./products/EditProduct";

const MainPage = () => {
  console.log("MainPage");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState("Dashboard");

  return (
    <div className="flex">
      {/* Sidebar for desktop */}
      <div className="hidden md:block md:fixed  left-0 top-0 w-56 xl:w-60 bg-white">
        <Sidebar
          setPageTitle={setPageTitle}
          closeSidebar={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-56 xl:ml-60 flex flex-col">
        <header className="fixed top-0 z-50 left-0 md:left-56 xl:left-60 w-full bg-primary shadow-sm flex items-center">
          <div className="md:hidden">
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger className="h-16 bg-primary text-white">
                <button className="p-4">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-fit text-white">
                <Sidebar
                  setPageTitle={setPageTitle}
                  closeSidebar={() => setIsSidebarOpen(false)}
                />
              </SheetContent>
            </Sheet>
          </div>
          <h1 className="text-2xl font-semibold text-white px-4 h-16 flex items-center">
            {pageTitle}
          </h1>
        </header>
        <div className="mt-16 w-full overflow-hidden p-4">
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
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MainPage);
