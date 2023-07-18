const { Schema, model } = require("mongoose");

const suggestionSchema = new Schema({
  suggestedToUserId:{
    type: Number, //--------------RELATION
    required: true,
  },
  environmentInput: {
    type: Object,
    required: true
  },
  plantSuggestionId: {
    type: Number //--------------RELATION
  },
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
