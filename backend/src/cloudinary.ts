import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

export const uploadOnCloudinary = async (fileBuffer: any, folder: string) => {};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
export const upload = multer({ storage });
