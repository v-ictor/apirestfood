const mongoose = require("../connect");
var foodSchema = {
  name : String,
  description : String,
  ingredient : String
};
var food = mongoose.model("food", foodSchema);
module.exports = food;
