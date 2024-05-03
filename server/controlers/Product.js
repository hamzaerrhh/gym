import cloudinary from "../helper/cloud.js";
import Product from "../models/product.js";
const ProductController = {
  add: async (req, res) => {
    console.log("start add");
    console.log(req.body);

    try {
      const {
        name,
        prix,
        category,
        stock,
        description,
        mainImage,
        additionalImages,
      } = req.body;

      // Create a new product instance
      const newProduct = new Product({
        name: name,
        prix: prix,
        category: category,
        stock: stock,
        description: description,
        mainImage: mainImage,
        images: additionalImages,
      });

      // Save the new product to the database
      await newProduct.save();

      // Send success response
      res.status(201).json({ message: "Product added successfully" });
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  getAll: async (req, res) => {
    try {
      console.log("start getting products");
      const products = await Product.find();
      return res.status(201).send(products);
    } catch (err) {
      console.log(err);
      return res.status(501).json({ message: "Server Error" });
    }
  },
  edit: async (req, res) => {
    console.log("start editing");
    //find the producte
    //const id = req.params()

    //get the data and modify

    //save and response to client
  },
  delet: async (reqq, res) => {
    //find the product
    //delete and save
    //resonse to client
  },
};

export default ProductController;
