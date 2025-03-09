const mongoose = require("mongoose");

const setupShema = new mongoose.Schema({
  isCompleted: { type: Boolean, required: true },
});

const setupModel = mongoose.model("setup", setupShema);

module.exports = setupModel;
