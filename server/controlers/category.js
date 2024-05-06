import CategoryProduct from "../models/productCatehgory.js";

const ProductC = {
  add: async (req, res) => {
    try {
      const newCat = req.body.newCategory;
      console.log(req.body.newCategory);
      console.log("start find");
      const category = await CategoryProduct.find({ category: newCat });

      if (category.length > 0) {
        console.log(category);
        console.log("the cat exist");
        return res.status(501).json({ message: "category exist" });
      }
      console.log("not find");

      const cat = new CategoryProduct({
        category: newCat,
      });
      await cat.save();
      console.log("save ct done");
      return res.status(201).json({
        success: true,
        message: "The category has been added",
      });
    } catch (err) {
      console.log(err);
    }
  },
  get: async (req, res) => {
    try {
      console.log("start getting data");
      let cat = await CategoryProduct.find();
      console.log(cat);
      res.status(200).json(cat); // Send the response with the fetched data
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Error in getting category products" });
    }
  },
};
export default ProductC;
