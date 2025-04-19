const CategorySchema = require("../models/CategoryModel");

exports.addCategory = async (req, res) => {
  const { title, description } = req.body;

  const category = CategorySchema({
    title,
    description,
  });

  try {
    //validations
    if (!title || !description) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    await category.save();
    res.status(200).json({ message: "Category Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }

  console.log(category);
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await CategorySchema.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const category = await CategorySchema.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category updated" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  CategorySchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Category Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
};
