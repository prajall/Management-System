import { useState } from "react";
import Sidebar from "@/pages/adminPanel/components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import ManageUsers from "./human-resource/Employees";
import Settings from "./administration/Settings";
import RoleManagement from "./human-resource/RoleManagement";
import Countries from "./master/Countries";
import Cities from "./master/Cities";
import Areas from "./master/Areas";

const MainPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState("Dashboard");

  return (
    <div className="flex h-screen">
      {/* Sidebar for desktop */}
      <div className="hidden md:block md:fixed w-56 xl:w-60 overflow-auto">
        <Sidebar
          setPageTitle={setPageTitle}
          closeSidebar={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-56 xl:ml-60  overflow-auto">
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
        <div className="mt-16 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<ManageUsers />} />
            <Route path="/roles-permissions" element={<RoleManagement />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/cities" element={<Cities />} />
            <Route path="/areas" element={<Areas />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
