const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Request = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    resume: { type: String, required: true },
    skills: { type: String },
    phone: { type: String, required: true },
    gitlink: { type: Date },
    linkedlink: { type: String },
    additional_info: { type: String, required: true },
    post_id: { type: Schema.Types.ObjectId, ref: "posts", required: true },
    accepted: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("requests", Request);
