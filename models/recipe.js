const mongoose = require("mongoose");

const allowedCategories = [
  "breakfast",
  "lunch",
  "dinner",
  "dessert",
  "snack",
  "drink",
];

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    prepTime: {
      type: Number,
      required: true,
    },
    cookTime: {
      type: Number,
      required: true,
    },
    servings: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["easy", "medium", "hard"],
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
      enum: allowedCategories,
    },
    createdBy: {
      type: String,
      default: "placeholder-user",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Recipe", recipeSchema);
