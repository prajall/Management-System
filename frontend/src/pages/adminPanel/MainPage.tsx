import Sidebar from "@/pages/adminPanel/components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";

const MainPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:block w-56 xl:w-64">
        <Sidebar />
      </div>
      {/* Main content */}

      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default MainPage;
