var express = require('express');
var router = express.Router();
var Food = require("../../../database/collections/food");
var _ = require("underscore");
/* GET home page. */
// CRUD
//Creation of food
router.post("/food", (req, res) => {
  if (req.body.name == "" || req.body.description == "" || req.body.ingredient == "") {
    res.status(400).json({
      "msn" : "Formato incorrecto"
    });
    return;
  }
  var food = {
    name : req.body.name,
    description : req.body.description,
    ingredient : req.body.ingredient
  };
  var foodData = new Food(food);
  foodData.save().then( () => {
    res.status(200).json({
      "msn" : "Food registrado con exito."
    });
  });
});

module.exports = router;
