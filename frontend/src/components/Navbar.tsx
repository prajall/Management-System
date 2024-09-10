//@ts-nocheck
import { AppContext } from "../contexts/Appcontext";
import React, { useContext } from "react";

const Navbar = () => {
  const { appData, isLoadingAppData } = useContext(AppContext);
  return (
    <div className="w-full py-6 bg-teal-600 text-teal-50 px-4 sm:px-10 lg:px-20">
      {!appData.user && !isLoadingAppData && (
        <>
          <p className="text-center w-full font-semibold text-lg">
            Welcome, Please Login
          </p>
        </>
      )}
      {appData.user && (
        <>
          <p className="text-center w-full font-semibold text-lg">
            Welcome, You are Logged in as "{appData.user.role}"
          </p>
        </>
      )}
    </div>
  );
};

export default Navbar;
