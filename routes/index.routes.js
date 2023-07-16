const express = require('express');
const router = express.Router();
const Plant = require("../models/Plant.model")
const idealClimate = require("../utils/idealClimate_Values")
const sunlight = require("../utils/sunlight_Values");
const soilType = require("../utils/soilType_Values");
const organicMatter = require("../utils/organicMatter_Values");
const plantType = require("../utils/plantType_Values");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//GET add plant to database page
router.get("/add_plant", (req, res, next) => {
  //console.log(req);
  res.render("add_plant", { idealClimate, sunlight, soilType, organicMatter, plantType });
});

router.post("/add_plant", async (req, res) => {
  const { plantName, species, idealClimate, sunlight, soilType, organicMatter, plantType, extraInfo, image } = req.body;

  try {
    const newPlant = await Plant.create({ plantName, species, idealClimate, sunlight, soilType, organicMatter, plantType, extraInfo, image });

    res.redirect("/new_plant_added")
  } catch (error) {
    console.log(error)
  }
});

router.get("/new_plant_added", (req, res) => {
  res.render("new_plant_added");
});

router.get("/suggestion_request", (req, res) => {
  res.render("suggestion_request");
});

router.post("/suggestion_request", (req, res) => {
  const envData = req.body;
});

/* GET test page */
router.get("/test", (req, res, next) => {
  res.render("test");
});

module.exports = router;
