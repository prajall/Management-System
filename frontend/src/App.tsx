import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ManageUsers from "./pages/adminPanel/human-resource/Employees";
// import NewProduct from "./pages/NewProduct";
import axios from "axios";
import { toast } from "react-toastify";
import Setup from "./pages/Setup";
import RoleManagement from "./pages/adminPanel/human-resource/RoleManagement";
import MainPage from "./pages/adminPanel/MainPage";
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
      console.log("Config Checking Response:", response.data);

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

  // const fetchENV = async () => {
  //   try {
  //     const response = await axios.get(`${import.meta.env.VITE_API_URL}/env`);
  //     if (response.status === 200) {
  //       sessionStorage.setItem("ENV", JSON.stringify(response.data));
  //     }
  //     console.log("ENV files:", response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
      {/* <Navbar /> */}
      <div className="">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/admin/*" element={<MainPage />} />
          <Route path="/install" element={<Setup />} />
          <Route path="/roles" element={<RoleManagement />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manage-users" element={<ManageUsers />} />
        </Routes>
      </div>
    </>
  );
}
//commiting ok
export default App;
