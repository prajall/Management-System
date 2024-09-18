import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
    joinDate: {
      type: Date,
      required: true,
    },
    leftDate: {
      type: Date,
    },
    profileImage: {
      type: String,
    },
    // branch: {
    //   type: String,
    //   required: true,
    // },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    landlineNo: {
      type: String,
    },
    address: {
      country: {
        type: String,
        // required: true,
      },
      city: {
        type: String,
        // required: true,
      },
      area: {
        type: String,
        // required: true,
      },
    },
  },
  { timestamps: true }
);

export const Employee = mongoose.model("Employee", employeeSchema);
