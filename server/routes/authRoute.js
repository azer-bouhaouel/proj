const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminModel = require("../models/adminModel");
const employeeModel = require("../models/employeeModel");

router.post("/login", async (req, res) => {
  const { login } = req.body;
  const loggerPassword = req.body.password;

  if (!login || !loggerPassword) {
    return res.json({ message: "some data are missing" });
  }

  try {
    let found = await employeeModel.findOne({ login: login });
    if (!found) {
      found = await adminModel.findOne({ login: login }); // because we only have one admin
    }

    if (!found) {
      return res.json({ message: "login credential incorrect" });
    }

    const match = await bcrypt.compare(loggerPassword, found.password);

    if (!match) {
      return res.json({ message: "password incorrect" });
    }
    const userFound = found.toObject();
    const { passwordChanged, role, fullName } = userFound;
    const user = { login, passwordChanged, role, fullName };
    const token = jwt.sign({ user: user }, "tanit-secret-key");
    return res.json({
      data: { user: user, token: token },
      message: "login successfully",
    });
  } catch (err) {
    return res.json({ message: "internal server error" });
  }
});

module.exports = router;
