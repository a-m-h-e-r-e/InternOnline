const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema(
  {
    title: { type: String, required: true, unique: true },
    company_id: { type: Schema.Types.ObjectId, ref: "companies" },
    name: { type: String },
    description: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    field: { type: String, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("posts", Post);
