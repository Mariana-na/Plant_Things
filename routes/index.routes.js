const express = require('express');
const router = express.Router();
const Plant = require("../models/Plant.model")
const climateZone = require("../utils/climateZone_Values")
const sunlight = require("../utils/sunlight_Values");
const soilType = require("../utils/soilType_Values");
const organicMatter = require("../utils/organicMatter_Values");
const plantType = require("../utils/plantType_Values");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


//GET add plant to database page
router.get("/add_plant", (req, res) => {
  //console.log(req);
  res.render("add_plant", { climateZone, sunlight, soilType, organicMatter, plantType });
});

router.post("/add_plant", async (req, res) => {
  const { plantName, species, climateZone, sunlight, soilType, organicMatter, plantType, extraInfo, image } = req.body;

  try {
    const newPlant = await Plant.create({
      plantName,
      species,
      climateZone,
      sunlight,
      soilType,
      organicMatter,
      plantType,
      extraInfo,
      image
    });
    res.redirect(`/new_plant_added/${newPlant._id}`);

  } catch (error) {
    console.log(error)
  }
});

router.get("/new_plant_added/:plantId", async (req, res) => {
  console.log("this is the console.log of the parameters", req.params.plantId);
  const plantId = req.params.plantId

  try {
    const newlyAddedPlant = await Plant.findById(plantId)
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA", newlyAddedPlant)

    res.render("new_plant_added", {newlyAddedPlant});

  } catch (error) {
    console.log(error);
  }
});

router.get("/suggestion_request", (req, res) => {
  res.render("suggestion_request");
});


router.post("/new_suggestions", async (req, res) => {
  const { climateZone, sunlight, soilType, organicMatter, plantType } = req.body;

  try {
    const matchedPlant = await Plant.find({
      climateZone,
      sunlight,
      soilType,
      organicMatter,
      plantType,
    });

    console.log(matchedPlant)
    res.render("new_suggestions", { matchedPlant });

  } catch (error) {
    console.log(error);
  }
});

/* GET test page */
router.get("/test", (req, res, next) => {
  res.render("test");
});

module.exports = router;
