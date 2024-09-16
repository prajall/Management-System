import { v2 as cloudinary } from "cloudinary";

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
