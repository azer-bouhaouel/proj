const mongoose = require("mongoose");

const installationSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  clientId: { type: String, required: true },
  managerId: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String },
  panels: { type: Number, required: true },
});

const installationModel = mongoose.model("installation", installationSchema);

module.exports = installationModel;
