import express from "express";
import {
  createProduct,
  deleteProduct,
  getLatestProducts,
  searchProductByTitle,
  updateProduct,
  viewAllProducts,
  viewOneProduct,
} from "../controllers/productController";
import { authChecker } from "../middlewares/authChecker";
import { adminChecker, checkPermission } from "../middlewares/checkPermission";
import { upload } from "../cloudinary";

const Router = express.Router();

Router.post(
  "/",
  authChecker,
  checkPermission("Product", "Add"),
  upload.array("images"),
  createProduct
);
Router.put(
  "/:productId",
  authChecker,
  checkPermission("product", "update"),
  updateProduct
);
// Router.get("/", checkPermission("Product", "View"), viewAllProducts);
Router.get("/", viewAllProducts);
Router.get("/latest", authChecker, adminChecker, getLatestProducts);
Router.get("/search", searchProductByTitle);
Router.get("/:productId", checkPermission("Product", "View"), viewOneProduct);
Router.delete(
  "/:productId",
  authChecker,
  checkPermission("Product", "Delete"),
  deleteProduct
);
Router.post("/create", upload.array("images"), createProduct);

export default Router;
