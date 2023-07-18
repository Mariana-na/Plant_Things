const { Schema, model } = require("mongoose");

const suggestionSchema = new Schema({
  suggestedToUserId:{
    type: Number,
    required: true,
  },
  // suggestedToUsername: {
  //   type: String,
  //   required: true,
  // },
  // suggestedToUserImg: {
  //   type: String,
  // },
  environmentInput: {
    type: Object,
    required: true
  },
  // plantSuggestion: {
  //   type: Object,
  //   required: true
  // },
  timeStamp: {
    type: Date,
    default: Date.now
  },
  plantSuggestionId: {
    type: Number
  },
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
