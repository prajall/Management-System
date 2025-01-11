import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import permissionRoute from "./routes/permissionRoute";
import productRoute from "./routes/productRoute";
import roleRoute from "./routes/roleRoute";
import userRoute from "./routes/userRoute";
import installationRoute from "./routes/installation";
import employeeRoute from "./routes/employeeRoute";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

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
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// SETUP ROUTES
app.get("/", (req, res) => {
  res.send("Server is working");
});
app.use("/user", userRoute);
app.use("/permission", permissionRoute);
app.use("/role", roleRoute);
app.use("/product", productRoute);
app.use("/installation", installationRoute);
app.use("/employee", employeeRoute);

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

//testing multer

app.post("/upload", upload.array("file", 4), async (req, res) => {
  const files = req.files as Express.Multer.File[];
  if (files) {
    try {
      const uploadPromises = files.map(async (file) => {
        const uploadedFile = await cloudinary.uploader.upload(file.path);
        fs.unlinkSync(file.path);
        return uploadedFile;
      });

      const uploadResults = await Promise.all(uploadPromises);
      console.log(uploadResults);

      return res.json({
        message: "Files uploaded successfully",
        files: uploadResults,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "File upload failed" });
    }
  }

  return res.status(400).json({ message: "No files to upload" });
});
