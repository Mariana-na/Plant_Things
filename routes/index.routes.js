const express = require("express");
const router = express.Router();
const Plant = require("../models/Plant.model");
const Suggestion = require("../models/Suggestion.model");
const User = require("../models/User.model");
const climateZone = require("../utils/climateZone_Values");
const sunlight = require("../utils/sunlight_Values");
const soilType = require("../utils/soilType_Values");
const organicMatter = require("../utils/organicMatter_Values");
const plantType = require("../utils/plantType_Values");
const { isLoggedIn, isAdmin } = require("../middleware/route-guard.js");
const uploader = require("../middleware/cloudinary.config.js");

//---------------Home Page Route---------------------
router.get("/", (req, res, next) => {
  res.render("index");
});

//-------------------Add Plant to Database Routes---------------
router.get("/plants/add_plant", isLoggedIn, (req, res) => {
  //console.log(req);
  res.render("plants/add_plant", {
    climateZone,
    sunlight,
    soilType,
    organicMatter,
    plantType,
  });
});

router.post("/plants/add_plant", uploader.single("imageUrl"), async (req, res, next) => {
  console.log("REQFILEREQFILEREQFILEREQFILEREQFILEREQFILEREQFILE", req.file);
  
  if (!req.file) {
    console.log("there was an error uploading the file");
    next(new Error("No file uploaded!"));
    return;
  }
  
  const {
    plantName,
    species,
    climateZone,
    sunlight,
    soilType,
    organicMatter,
    plantType,
    extraInfo,
    // image,
  } = req.body;

 
  const image = req.file.path;

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
      image,
    });
    
    
    res.redirect(`/plants/plant_info/${newPlant._id}`);
  } catch (error) {
    console.log(error);
  }
});

//------------------Display Newly Added Plant Route-------------
router.get("/plants/plant_info/:plantId", async (req, res) => {
  console.log("this is the console.log of the parameters", req.params.plantId);
  const plantId = req.params.plantId;

  try {
    const newlyAddedPlant = await Plant.findById(plantId);
    console.log(newlyAddedPlant);

    res.render("plants/plant_info", { newlyAddedPlant });
  } catch (error) {
    console.log(error);
  }
});

//------------All Plants Page Route---------------
router.get("/plants/view_all_plants", isAdmin, async (req, res, next) => {
  console.log("fhjfiehfoewhfioehf just after get");
  try {
    const allPlants = await Plant.find();
    console.log(
      "LOOK AT ME LOOK AT ME LOOK AT ME LOOK AT ME LOOK AT ME",
      allPlants
    );
    res.render("plants/view_all_plants", { allPlants });
  } catch (error) {
    console.log(error);
  }
});

//----------------Environment Input Route--------------------
router.get("/suggestions/suggestion_request", isLoggedIn, (req, res) => {
  res.render("suggestions/suggestion_request");
});

//----------------Suggestion Output Route---------------------
router.post("/suggestions/new_suggestion", async (req, res) => {
  const { climateZone, sunlight, soilType, organicMatter, plantType } =
    req.body;
  try {
    const matchedPlant = await Plant.find({
      climateZone: { $in: [climateZone] },
      sunlight,
      soilType: { $in: [soilType] },
      organicMatter,
      plantType,
    });
    console.log(matchedPlant);

    let suggestedToUserId = req.session.currentUser._id;
    //console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa", req.session.currentUser._id)

    const suggestionData = {
      suggestedToUserId,
      environmentInput: req.body,
      plantSuggestionId: matchedPlant,
    };
    //console.log("bbbbbbbbbbbbbbbbbbbbbbbb", suggestionData)
    const newSuggestion = new Suggestion(suggestionData);
    await newSuggestion.save();
    res.render("suggestions/new_suggestion", { matchedPlant });
  } catch (error) {
    console.log(error);
  }
});

//-------------Feedback Page Route------------------
router.get("/suggestions/feedback", async (req, res) => {
  const {suggestedToUserId, environmentInput, plantSuggestionId} = req.query

  try {
    const feedbackCards = await Suggestion.find().populate({path:"suggestedToUserId", model: "User"}).populate({path:"plantSuggestionId", model: "Plant"}).limit(6);

    const curatedCards = [];

    for (const card of feedbackCards) {
      const randomIndex = Math.floor(Math.random() * card.plantSuggestionId.length)
      



      curatedCards.push({
        _id: card._id,
        user: card.suggestedToUserId,
        environmentInput: card.environmentInput,
        plant: card.plantSuggestionId[randomIndex],
        thumbsUp: card.thumbsUp,
        thumbsDown: card.thumbsDown,
        createdAt: card.createdAt,
      });


    }



    res.render("suggestions/feedback", { curatedCards});
  } catch (error) {
    console.log(error);
  }
});


//------------------------Update ThumbsUP ---------------------------
router.post("/suggestions/feedback/thumbsUp/:curatedCardsId", async (req, res) => {

  
  try {
    const suggestionTU = await Suggestion.findByIdAndUpdate(req.params.curatedCardsId,{ $inc: { thumbsUp: 1 } }, { new: true });

    console.log("Updated thumbsUp count:", suggestionTU);
    res.redirect("/suggestions/feedback");
  } catch (error) {
    console.log(error);
  }
});

//-----------------------Update ThumbsDown---------------------------------
router.post("/suggestions/feedback/thumbsDown/:curatedCardsId", async (req, res) => {

  
  try {
    const suggestionTD = await Suggestion.findByIdAndUpdate(req.params.curatedCardsId,{ $inc: { thumbsDown: 1 } }, { new: true });

    console.log("Updated thumbsDown count:", suggestionTD);
    res.redirect("/suggestions/feedback");
  } catch (error) {
    console.log(error);
  }
});





//-------------Update Routes------------------
router.get("/plants/update_plant/:plantId", isAdmin, async (req, res) => {
  try {
    const plantToUpdate = await Plant.findById(req.params.plantId);
    res.render("plants/update_plant", { plantToUpdate });
  } catch (error) {
    console.log(error);
  }
});

router.post("/plants/update_plant/:plantId", async (req, res) => {
  console.log(req.body, req.params);

  try {
    await Plant.findByIdAndUpdate(req.params.plantId, req.body);
    res.redirect(`/plants/plant_info/${req.params.plantId}`);
  } catch (error) {
    console.log(error);
  }
});

//-------------------Delete Route-------------
router.post("/plants/plant_info/:plantId/delete", isAdmin, async (req, res) => {
  console.log(req.params);

  try {
    await Plant.findByIdAndDelete(req.params.plantId);
    res.redirect("/plants/view_all_plants");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
