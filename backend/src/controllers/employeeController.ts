import { Request, Response } from "express";
import { Employee } from "../models/employeeModel";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const createEmployee = async (req: Request, res: Response) => {
  const {
    name,
    gender,
    email,
    password,
    mobileNo,
    joinDate,
    branch,
    designation,
    address,
  } = req.body;
  const profileImage = req.files as Express.Multer.File[];

  if (!profileImage) {
    return res.status(400).json({ message: "Profile image is required" });
  }

  try {
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cloudinaryResult = await cloudinary.uploader.upload(
      profileImage[0].path,
      {
        folder: "employees",
      }
    );
    console.log("cloudinaryResult", cloudinaryResult);
    fs.unlinkSync(profileImage[0].path);

    const newEmployee = new Employee({
      name,
      gender,
      email,
      password: hashedPassword,
      mobileNo,
      joinDate,
      branch,
      designation,
      address,
      profileImage: cloudinaryResult.secure_url,
      profileImagePublicId: cloudinaryResult.public_id,
    });

    const savedEmployee = await newEmployee.save();

    const employeeResponse = savedEmployee.toObject() as any;
    delete employeeResponse.password;

    return res.status(201).json(employeeResponse);
  } catch (error) {
    console.error("Error registering employee:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
