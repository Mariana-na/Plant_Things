const express = require('express');
const router = express.Router();
const Plant = require ("../models/Plant.model")
const idealClimate = require("../utils/idealClimate_Values")
const directSunlightH = require("../utils/directSunlight_Values");
const soilType = require("../utils/soilType_Values");
const organicMatter = require("../utils/organicMatter_Values");
const space = require("../utils/space_Values");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});



router.get("/profile", (req, res, next) => {
  res.render("profile");
});

//GET add plant to database page
router.get("/add_plant", (req, res, next) => {
  //console.log(req);
  res.render("add_plant", {idealClimate, directSunlightH, soilType, organicMatter, space});
});

/* GET test page */
router.get("/test", (req, res, next) => {
  res.render("test");
});

module.exports = router;
