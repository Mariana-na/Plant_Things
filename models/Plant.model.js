const { Schema, model } = require("mongoose");
const idealClimate = require("../utils/idealClimate_Values");
const directSunlightH = require("../utils/directSunlight_Values");
const soilType = require("../utils/soilType_Values");
const organicMatter = require("../utils/organicMatter_Values");

const plantSchema = new Schema(
  {
    plantName: {
      type: String,
      trim: true,
      required: true,
    },
    species: {
      type: String,
      required: true,
      trim: true
    },
    idealClimate: {
      type: String,
      label: "Select One",
      enum: idealClimate,
      required: true,
      //Should allow multiple selections?
    },
    directSunlightH: {
        type: String,
        label: "Select One",
        enum: directSunlightH,
        required: true,
    },
    soilType: {
        type: String,
        label: "Select One",
        enum: soilType,
        required: true,
    },
    organicMatter: {
        type: String,
        label: "Select One",
        enum: organicMatter,
        required: true,
    },
    space: {
        type: String,
        label: "Select One",
        enum: ["Lots", "Some", "Little"],
        required: true,
        //ADD DROP DOWN OPTIONS
    }
  },

);

const Plant = model("Plant", plantSchema);

module.exports = Plant;