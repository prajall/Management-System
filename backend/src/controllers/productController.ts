import { Request, Response } from "express";
import { Product } from "../models/productModel";
import { uploadOnCloudinary } from "../cloudinary";

import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { title, description, basePrice, category } = req.body;
    console.log("req.body", req.body);
    // console.log(title, description, basePrice, category);

    if (!title || !description || !basePrice || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const images = req.files as Express.Multer.File[];
    if (!images || images.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }

    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const cloudinaryResult: any = await uploadOnCloudinary(
          image.buffer,
          "products"
        );
        return cloudinaryResult.url;
      })
    );

    const newProduct = new Product({
      title,
      description,
      basePrice,
      category,
      images: imageUrls,
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
  const { page = 1, limit = 15, sort, searchQuery } = req.query;

  if (isNaN(Number(page)) || Number(page) <= 0) {
    return res.status(400).json({ message: "Invalid page number" });
  }

  if (isNaN(Number(limit)) || Number(limit) <= 0) {
    return res.status(400).json({ message: "Invalid limit number" });
  }

  try {
    let sortOptions = {};
    if (sort === "price01") {
      sortOptions = { price: 1 };
    } else if (sort === "price10") {
      sortOptions = { price: -1 };
    } else if (sort === "rating") {
      sortOptions = { rating: -1 };
    } else {
      sortOptions = { title: 1 };
    }

    let products = [];

    if (searchQuery) {
      products = await Product.find({
        title: { $regex: searchQuery, $options: "i" },
      })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit))
        .sort(sortOptions);
    } else {
      products = await Product.find()
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit))
        .sort(sortOptions);
    }

    const totalProducts = searchQuery
      ? await Product.countDocuments({
          title: { $regex: searchQuery, $options: "i" },
        })
      : await Product.countDocuments();

    return res.status(200).json({
      totalProducts,
      totalPages: Math.ceil(totalProducts / Number(limit)),
      currentPage: Number(page),
      products,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const searchResults = async (req: Request, res: Response) => {
  const { searchQuery, page = 1, limit = 15 } = req.query;

  if (isNaN(Number(page)) || Number(page) <= 0) {
    return res.status(400).json({ message: "Invalid page number" });
  }

  if (isNaN(Number(limit)) || Number(limit) <= 0) {
    return res.status(400).json({ message: "Invalid limit number" });
  }

  try {
    const products = await Product.find({
      title: { $regex: searchQuery, $options: "i" },
    })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const totalProducts = await Product.countDocuments({
      title: { $regex: searchQuery, $options: "i" },
    });

    return res.status(200).json({
      totalProducts,
      totalPages: Math.ceil(totalProducts / Number(limit)),
      currentPage: Number(page),
      products,
    });
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

export const getLatestProducts = async (req: Request, res: Response) => {
  console.log("getLatestProducts called");
  try {
    const latestProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(10);

    if (!latestProducts || latestProducts.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    console.log(latestProducts);

    return res.status(200).json(latestProducts);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const searchProductByTitle = async (req: Request, res: Response) => {
  const { searchQuery } = req.query;

  if (!searchQuery) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const products = await Product.find({
      title: { $regex: searchQuery, $options: "i" },
    });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
