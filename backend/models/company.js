const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Company = new Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    website: { type: String },
    password: { type: String, required: true },
    country: { type: String },
    rating: { type: Number, default: 0 },
    online: { type: Boolean },
    userType: { type: String },
    disabled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("companies", Company);
