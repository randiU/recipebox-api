const mongoose = require("mongoose");

const allowedCategories = [
  "breakfast",
  "lunch",
  "dinner",
  "dessert",
  "snack",
  "drink",
];

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      enum: allowedCategories,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Category", categorySchema);
