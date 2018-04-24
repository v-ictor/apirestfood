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
//DELETE one food
router.delete(/food\/[a-z0-9]{24,24}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Food.find({_id : id}).remove().exec( (error, docs) => {
    res.status(200).json(docs);
  });
});
//Patch one food
router.patch(/food\/[a-z0-9]{24,24}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var food = {};
  for (var i = 0; i < keys.length; i++) {
    food[keys[i]] = req.body[keys[i]];
  }
  // console.log(user);
  Food.findOneAndUpdate({_id: id}, food, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar los datos"
        });
        return;
      }
      res.status(200).json(params);
      return;
  });
});
module.exports = router;
