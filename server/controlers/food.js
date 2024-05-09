import Food from "../models/food.js";

const Action = {
  // Add a new food item
  add: async (req, res) => {
    try {
      console.log(req.body);

      // Verify data entry
      const { name, prix, ingrediens, description, info, mainImage } = req.body;

      if (
        !name ||
        !prix ||
        !info ||
        !ingrediens ||
        !info.protein ||
        !info.carbs ||
        !info.fat
      ) {
        return res.status(400).json({
          message:
            "Please provide all required fields: name, prix, and info (protein, carbs, fat).",
        });
      }

      // Add the food item
      const food = new Food({
        name,
        prix,
        ingrediens,
        description,
        info,
        mainImage,
      });
      await food.save();
      res.status(201).json(food);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get all food items
  getAll: async (req, res) => {
    try {
      const foods = await Food.find();
      res.json(foods);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a food item by ID
  getById: async (req, res) => {
    try {
      const food = await Food.findById(req.params.id);
      if (!food) {
        return res.status(404).json({ message: "Food not found." });
      }
      res.json(food);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a food item by ID
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedFood = await Food.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedFood) {
        return res.status(404).json({ message: "Food not found." });
      }
      res.json(updatedFood);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete a food item by ID
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedFood = await Food.findByIdAndDelete(id);
      if (!deletedFood) {
        return res.status(404).json({ message: "Food not found." });
      }
      res.json({ message: "Food deleted successfully." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default Action;
