const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/food");
module.exports = mongoose;
