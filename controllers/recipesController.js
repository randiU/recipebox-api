const mongoose = require('mongoose');
const Recipe = require('../models/recipe');

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();

    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get recipes',
      error: error.message
    });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const recipeId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(400).json({
        message: 'Invalid recipe ID format'
      });
    }

    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({
        message: 'Recipe not found'
      });
    }

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get recipe',
      error: error.message
    });
  }
};

const createRecipe = async (req, res) => {
  try {
    const newRecipe = await Recipe.create(req.body);

    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create recipe',
      error: error.message
    });
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe
};