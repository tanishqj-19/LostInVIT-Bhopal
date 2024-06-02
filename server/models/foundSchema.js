const mongoose = require("mongoose");

const foundSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  itemImgPath: { type: String, default: null },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  userProfileImgPath: { type: String, default: null },
});

const foundItems = new mongoose.model("foundItems", foundSchema);

module.exports = foundItems;
