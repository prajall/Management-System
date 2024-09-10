import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (fileBuffer: any, folder: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "image", folder }, (err, result) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(result);
        }
      })
      .end(fileBuffer);
  });
};
