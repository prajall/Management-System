import express from "express";
import { createPermission } from "../controllers/permissionController";

const Router = express.Router();

Router.post("/new-permission", createPermission);

export default Router;
