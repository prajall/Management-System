import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppProvider from "./contexts/Appcontext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
        style={{ width: 380 }}
      />

      <AppProvider>
        <div className="roboto-regular">
          <App />
        </div>
      </AppProvider>
    </BrowserRouter>
  </StrictMode>
);
