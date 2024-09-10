import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import permissionRoute from "./routes/permissionRoute";
import productRoute from "./routes/productRoute";
import roleRoute from "./routes/roleRoute";
import userRoute from "./routes/userRoute";
import installationRoute from "./routes/installation";

import jwt from "jsonwebtoken";

const app = express();

export default app;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// SETUP ROUTES
app.use("/user", userRoute);
app.use("/permission", permissionRoute);
app.use("/role", roleRoute);
app.use("/product", productRoute);
app.use("/installation", installationRoute);


app.get("/env", (req, res) => {
  try {
    const envVariables: any = {};

    Object.keys(process.env).forEach((key: any) => {
      if (key.startsWith("CLIENT_")) {
        envVariables[key] = process.env[key];
      }
    });

    const token = jwt.sign(envVariables, process.env.JWT_SECRET || "jwtsecret");

    res.status(200).send(token);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
