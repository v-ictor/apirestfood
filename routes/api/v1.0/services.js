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
//READ all food
router.get("/food", (req, res) => {
  Food.find({}).exec( (error, docs) => {
    res.status(200).json(docs);
  });
});
//READ only one food
router.get(/food\/[a-z0-9]{24,24}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Food.findOne({_id : id}).exec( (error, docs) => {
    if (docs != null) {
      res.status(200).json(docs);
      return;
    }
    res.status(404).json({
      "msn" : "Recurso no encontrado"
    });
  });
});
module.exports = router;
