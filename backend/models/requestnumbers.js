const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestNumbers = new Schema(
  {
    post_id: { type: Schema.Types.ObjectId, ref: "posts", required: true },
    numbers: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("requestnumbers", RequestNumbers);
