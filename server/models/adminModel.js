const mongoose = require("mongoose");

const adminShema = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  passwordChanged: { type: Boolean, required: true },
});

const adminModel = mongoose.model("admin", adminShema);

module.exports = adminModel;
