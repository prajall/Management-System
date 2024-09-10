import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ManageProducts from "./pages/ManageProducts";
import ManageUsers from "./pages/ManageUsers";
import NewProduct from "./pages/NewProduct";
import RoleManagement from "./pages/RoleManagement";
import axios from "axios";
import { toast } from "react-toastify";

function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkConfig = async () => {
    setLoading(true);
    try {
      // console.log(process.env.SERVER_URL);
      const response = await axios.get(
        "http://localhost:3001/installation/check-config"
      );
      console.log(response);

      if (response.data.message === "Setup configured") {
        setLoading(false);
      } else if (response.data.message === "Setup not configured") {
        // setLoading(false);
        navigate("/install");
      }
    } catch (error: any) {
      console.log(error);
      if (error.message === "Network Error") {
        toast.error("Error Connecting to the server");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchENV = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/env`);
      if (response.status === 200) {
        sessionStorage.setItem("ENV", JSON.stringify(response.data));
      }
      console.log("ENV files:", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // fetchENV();
    checkConfig();
  }, []);

  if (loading) {
    return (
      <div className="fixed z-[9999] top-0 left-0 w-screen h-screen flex justify-center items-center">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="px-4 sm:px-10 lg:px-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roles" element={<RoleManagement />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manage-users" element={<ManageUsers />} />

          <Route path="/manage-products" element={<ManageProducts />} />
          <Route path="/manage-products/new" element={<NewProduct />} />
          <Route path="/manage-products/:id" element={<NewProduct />} />
          <Route path="/manage-products/:id/edit" element={<NewProduct />} />
        </Routes>
      </div>
    </>
  );
}
//commiting ok
export default App;