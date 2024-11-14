import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";
import { dbName } from "./constants";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    await mongoose.connect(`${MONGODB_URI}/${dbName}`);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database Connection Error:", error);
  }
});

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Configuration
const storage = multer.memoryStorage();
export const upload = multer({ storage });
