const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  cin: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  passwordChanged: { type: Boolean, required: true },
  phone: { type: String, required: true },
  role: { type: String, required: true },
  address: { type: String, required: true },
});

const employeeModel = mongoose.model("employee", employeeSchema);

module.exports = employeeModel;
