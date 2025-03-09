const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const employeeModel = require("../models/employeeModel");

router.post("/changeCredential", async (req, res) => {
  const { login } = req.body;
  const pass = req.body.password;

  if (!pass) {
    return res.json({ message: "some data are missing" });
  }

  if (pass === login) {
    return res.json({ message: "please change your password" });
  }
  try {
    const hash = await bcrypt.hash(pass, 10);
    const updated = await employeeModel.findOneAndUpdate(
      { cin: login },
      {
        password: hash,
        passwordChanged: true,
      },
      { new: true }
    );
    const updatedObj = updated.toObject();
    const { passwordChanged, role, fullName } = updatedObj;
    const user = { fullName, role, passwordChanged, login };

    return res.json({ message: "credentail updated", user: user });
  } catch (err) {
    return res.json({ message: "internal server error" });
  }
});

module.exports = router;
