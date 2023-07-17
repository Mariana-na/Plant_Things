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
router.get("/plants/add_plant", (req, res) => {
  //console.log(req);
  res.render("plants/add_plant", { climateZone, sunlight, soilType, organicMatter, plantType });
});

router.post("/plants/add_plant", async (req, res) => {
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
    res.redirect(`/plants/plant_info/${newPlant._id}`);

  } catch (error) {
    console.log(error)
  }
});

router.get("/plants/plant_info/:plantId", async (req, res) => {
  console.log("this is the console.log of the parameters", req.params.plantId);
  const plantId = req.params.plantId

  try {
    const newlyAddedPlant = await Plant.findById(plantId)
    console.log("XYZXYZXYZXYZXYXZ", newlyAddedPlant)

    res.render("plants/plant_info", {newlyAddedPlant});

  } catch (error) {
    console.log(error);
  }
});

router.get("/suggestions/suggestion_request", (req, res) => {
  res.render("suggestions/suggestion_request");
});


router.post("/suggestions/new_suggestions", async (req, res) => {
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
    res.render("suggestions/new_suggestions", { matchedPlant });

  } catch (error) {
    console.log(error);
  }
});


router.get('/plants/view_all_plants', async (req, res, next) => {
  try {
    const allPlants = await Plant.find()
    res.render('plants/view_all_plants', { allPlants })
  } catch (error) {
    console.log(error)
  }
})

/*
router.get('/view_all_plants/:plantId/update', async (req, res, next) => {
  const plantToUpdate = await Plant.findById(req.params.plantId)
  res.render('updatedPlant', { plantToUpdate })
})
*/
module.exports = router;
