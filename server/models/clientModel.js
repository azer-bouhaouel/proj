const mongoose = require("mongoose");

const clientShema = new mongoose.Schema({
  fullName: { type: String, required: true },
  cin: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
});

const clientModel = mongoose.model("client", clientShema);

module.exports = clientModel;
