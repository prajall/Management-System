import express from "express";
import {
  createProduct,
  deleteProduct,
  getLatestProducts,
  updateProduct,
  viewAllProducts,
  viewOneProduct,
} from "../controllers/productController";
import { authChecker } from "../middlewares/authChecker";
import { adminChecker, checkPermission } from "../middlewares/checkPermission";

const Router = express.Router();

Router.post("/", authChecker, checkPermission("Product", "Add"), createProduct);
Router.put(
  "/:productId",
  authChecker,
  checkPermission("product", "update"),
  updateProduct
);
// Router.get("/", checkPermission("Product", "View"), viewAllProducts);
Router.get("/", viewAllProducts);
Router.get("/latest", authChecker, adminChecker, getLatestProducts);
Router.get("/:productId", checkPermission("Product", "View"), viewOneProduct);
Router.delete(
  "/:productId",
  authChecker,
  checkPermission("Product", "Delete"),
  deleteProduct
);

export default Router;
