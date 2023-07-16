const { Schema, model } = require("mongoose");

const suggestionSchema = new Schema({
  suggestedToUserId: String,
  timestamp: Date,
  suggestedPlantId: String,
  thumbsUp: {
    type: Number,
    default: 0,
  },
  thumbsDown: {
    type: Number,
    default: 0,
  },

});

const Suggestion = model("Suggestion", suggestionSchema);

module.exports = Suggestion;
