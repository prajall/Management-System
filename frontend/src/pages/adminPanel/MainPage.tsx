import { useState } from "react";
import Sidebar from "@/pages/adminPanel/components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const MainPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar for desktop */}
      <div className="hidden md:block w-56 xl:w-64">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-primary shadow-sm flex items-center">
          <div className="md:hidden">
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger className="h-16 bg-primary text-white">
                <button className="p-4">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-fit text-white">
                <Sidebar />
              </SheetContent>
            </Sheet>
          </div>
          <h1 className="text-2xl font-semibold text-white px-4 py-4">
            Dashboard
          </h1>
        </header>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainPage;
