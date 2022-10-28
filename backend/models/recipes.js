const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipesSchema = new Schema ({
  image: String,
  name: String,
  created_by: String,
  ingredients: String,
  procedure: String,
  created_at: String,
  updated_at: String,
}

// {timestamps: true}

);

module.exports = mongoose.model("Recipe", recipesSchema);