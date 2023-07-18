const express = require('express');
const router = express.Router();
const Plant = require ("../models/Plant.model")
const idealClimate = require("../utils/idealClimate_Values")
const directSunlightH = require("../utils/directSunlight_Values");
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
  res.render("add_plant", {idealClimate, directSunlightH, soilType, organicMatter, plantType});
});

router.get("/suggestion_request", (req, res) => {
  res.render("suggestion_request");
})

router.post("/suggestion_request", (req, res) => {
  const envData = req.body;
})

/* GET test page */
router.get("/test", (req, res, next) => {
  res.render("test");
});

const { isLoggedIn, isAdmin } = require("../middleware/route-guard.js");
module.exports = router;
