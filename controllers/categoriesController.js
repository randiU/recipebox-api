const Category = require('../models/Category');

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get categories',
      error: error.message
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create category',
      error: error.message
    });
  }
};

module.exports = {
  getAllCategories,
  createCategory
};