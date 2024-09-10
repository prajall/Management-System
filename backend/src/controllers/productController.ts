import { Request, Response } from "express";
import { Product } from "../models/productModel";
import { uploadOnCloudinary } from "../cloudinary";

import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { title, description, price, category } = req.body;

    console.log(title, description, price, category);

    if (!title || !description || !price || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // let imageUrl = "";
    // if (req.file) {
    //   const cloudinaryResult: any = await uploadOnCloudinary(
    //     req.file.buffer,
    //     "products"
    //   );
    //   imageUrl = cloudinaryResult.url;
    // }

    const newProduct = new Product({
      title,
      description,
      price,
      category,
      // image: imageUrl,
    });

    await newProduct.save();

    return res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// export const createProduct = async (req: Request, res: Response) => {
//   try {
//     // const { title, description, price } = req.body;

//     // if (!title || !description || !price) {
//     //   return res.status(400).json({ message: "All fields are required" });
//     // }

//     products.map(async (product, index) => {
//       const newProduct = await Product.create(product);
//       console.log(index);
//     });

//     return res.status(201).send("Products created");

//     // return res
//     //   .status(201)
//     //   .json({ message: "Product created successfully", product: newProduct });
//   } catch (error) {
//     return res.status(500).json({ message: "Internal Server Error", error });
//   }
// };

export const updateProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { title, description, price } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { title, description, price },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const viewAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const viewOneProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
