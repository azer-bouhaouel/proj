const mongoose = require("mongoose");
const setupModel = require("../models/setupModel");
const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");

mongoose.connect("mongodb://localhost:27017/photovoltaic", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function startSetup() {
  try {
    let foundSetup = await setupModel.findOne();

    if (!foundSetup) {
      await setupModel.create({ isCompleted: false });
      foundSetup = await setupModel.findOne();
    }

    if (foundSetup.isCompleted) {
      console.log("admin already created");
      return;
    }

    const passwordHashed = await bcrypt.hash("admin", 10);

    await adminModel.create({
      login: "admin",
      fullName: "admin",
      password: passwordHashed,
      role: "admin",
      passwordChanged: false,
    });

    await setupModel.updateOne({}, { isCompleted: true });
    console.log("admin created successfull");
    return;
  } catch (err) {
    console.log("error occured ! try again");
  } finally {
    mongoose.disconnect();
  }
}

startSetup();
