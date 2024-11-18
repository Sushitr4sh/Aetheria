import { Schema, model, models } from "mongoose";

/* const MoodEnum = {
  HAPPINESS: "happiness",
  SADNESS: "sadness",
  DISGUST: "disgust",
  FEAR: "fear",
  SURPRISE: "surprise",
  ANGER: "anger",
}; */

const journalSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  entryText: {
    type: String,
    required: [true, "Journal entry is required!"],
  },
  moodData: {
    type: [Number],
    required: true,
  },
  recommendation: {
    type: [String],
    required: true,
  },
  shortSummary: {
    type: String,
    required: true,
  },
});

const Journal = models.Journal || model("Journal", journalSchema);
export default Journal;
