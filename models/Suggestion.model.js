const { Schema, model } = require("mongoose");
const suggestionSchema = new Schema(
  {
    suggestedToUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    environmentInput: {
      type: Object,
      required: true,
    },
    plantSuggestionId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Plant",
      },
    ],
    thumbsUp: {
      type: Number,
      default: 0,
    },
    thumbsDown: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
const Suggestion = model("Suggestion", suggestionSchema);
module.exports = Suggestion;
