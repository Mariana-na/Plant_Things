const { Schema, model } = require("mongoose");
const climateZone = require("../utils/climateZone_Values");
const sunlight = require("../utils/sunlight_Values");
const soilType = require("../utils/soilType_Values");
const organicMatter = require("../utils/organicMatter_Values");
const plantType = require("../utils/plantType_Values");

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
    climateZone: {
      type: [String],
      label: "Select One",
      enum: climateZone,
      required: true,
    },
    sunlight: {
        type: String,
        label: "Select One",
        enum: sunlight,
        required: true,
    },
    soilType: {
        type: [String],
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
    plantType: {
        type: String,
        label: "Select One",
        enum: plantType,
        required: true,
    },
    extraInfo: {
      type: String,
    },
    image: {
      type: String,
    }
  },

);

const Plant = model("Plant", plantSchema);

module.exports = Plant;