const mongoose = require("mongoose");

const setupSchema = new mongoose.Schema({
  isCompleted: { type: Boolean, required: true },
});

const setupModel = mongoose.model("setup", setupSchema);

module.exports = setupModel;
