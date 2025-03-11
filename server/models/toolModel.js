const mongoose = require("mongoose");

const toolSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  quantity: { type: String, required: true },
});

const toolModel = mongoose.model("tool", toolSchema);

module.exports = toolModel;
