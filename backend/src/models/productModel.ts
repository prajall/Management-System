import { count } from "console";
import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    min: [3, "Title must be at least 3 characters long"],
    max: [100, "Title must be at most 100 characters long"],
  },
  description: {
    type: String,
    required: true,
    min: [10, "Description must be at least 10 characters long"],
    max: [1000, "Description must be at most 1000 characters long"],
  },
  basePrice: {
    type: Number,
    required: true,
    min: [0, "Price must be at least 0"],
  },
  category: {
    type: String,
    // required: [true, "Category is required"],
  },
  images: {
    type: [String],
    required: true,
  },
  publicIds: {
    type: [String],
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  discountAmount: {
    type: Number,
    default: 0,
    min: [0, "Discount Cannot be less than 0"],
    validate: {
      validator: function (this: any, value: number): boolean {
        return value <= this.basePrice;
      },
      message: "Discount amount cannot exceed the product price",
    },
  },
  variations: {
    type: [String],
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: [0, "Stock cannot be less than 0"],
  },
  brand: {
    type: String,
    required: true,
  },
  rating: {
    type: {
      rate: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  },
});

export const Product = mongoose.model("Product", productSchema);
