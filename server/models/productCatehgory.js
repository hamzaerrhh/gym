import mongoose from "mongoose";
const CategoryProductScema = mongoose.Schema({
  category: String,
});

const CategoryProduct =
  mongoose.model.CategoryProduct ||
  mongoose.model("product_categories", CategoryProductScema);
export default CategoryProduct;
