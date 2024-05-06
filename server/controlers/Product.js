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
    try {
      console.log("start editing");

      const id = req.params.productId;
      console.log(req.body);
      console.log(id);

      // Update the product
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      // Respond with the updated product
      res.json(updatedProduct);
    } catch (error) {
      console.error("Error editing product:", error);
      res
        .status(500)
        .json({ error: "An error occurred while editing the product" });
    }
  },
  delet: async (req, res) => {
    const id = req.params.id;
    //find the product
    try {
      let product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).json({ message: "Could not find product." });
      }
      res.status(201).json({ msg: "delet succes" });
    } catch (err) {
      console.log(err);
      return res.status(401).send({ msg: "err" });
    }
    //delete and save
    //resonse to client
  },
};

export default ProductController;
