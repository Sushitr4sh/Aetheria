import { Schema, model, models } from "mongoose";

const journalSchema = new Schema(
  {
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
    isJournal: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Journal = models.Journal || model("Journal", journalSchema);
export default Journal;
