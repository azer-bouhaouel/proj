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
      found = await adminModel.findOne({ login: login });
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
      ok: true,
      data: { user: user, token: token },
      message: "login successfully",
    });
  } catch (err) {
    return res.json({ message: "internal server error" });
  }
});

router.put("/changeEmployeeCredential", async (req, res) => {
  const { login, oldPassword } = req.body;
  const pass = req.body.password;

  if (!login || !pass) {
    return res.json({ message: "login and password are required" });
  }

  if (pass === login) {
    return res.json({ message: "please change your password" });
  }
  try {
    const employee = await employeeModel.findOne({ login: login });
    if (employee.passwordChanged) {
      if (!oldPassword) {
        return res.json({ message: "old password doesn't exists" });
      }
      const match = await bcrypt.compare(oldPassword, employee.password);
      if (!match) {
        return res.json({ message: "old password is wrong" });
      }

      const hash = await bcrypt.hash(pass, 10);
      const updated = await employeeModel.findOneAndUpdate(
        { login: login },
        {
          password: hash,
          passwordChanged: true,
        },
        { new: true }
      );
      const updatedObj = updated.toObject();
      const { passwordChanged, role, fullName } = updatedObj;
      const user = { fullName, role, passwordChanged, login };

      return res.json({ ok: true, message: "credentail updated", user: user });
    }

    const hash = await bcrypt.hash(pass, 10);
    const updated = await employeeModel.findOneAndUpdate(
      { login: login },
      {
        password: hash,
        passwordChanged: true,
      },
      { new: true }
    );
    const updatedObj = updated.toObject();
    const { passwordChanged, role, fullName } = updatedObj;
    const user = { fullName, role, passwordChanged, login };

    return res.json({ ok: true, message: "credentail updated", user: user });
  } catch (err) {
    return res.json({ message: "internal server error" });
  }
});

router.put("/changeAdminCredential", async (req, res) => {
  const { fullName, login } = req.body;
  const pass = req.body.password;

  if (!fullName || !login) {
    return res.json({ message: "fullName and login are required" });
  }

  try {
    const admin = await adminModel.findOne({ login: login });
    if (admin.passwordChanged) {
      const oldPassword = req.body.oldPassword;
      if (!oldPassword) {
        return res.json({ message: "old password doesn't exists" });
      }
      const match = await bcrypt.compare(oldPassword, admin.password);
      if (match) {
        if (!pass) {
          const updated = await adminModel.findOneAndUpdate(
            {},
            {
              fullName: fullName,
              login: login,
            },
            { new: true }
          );
          const updatedObj = updated.toObject();
          const { password, ...updatedUser } = updatedObj;
          return res.json({
            ok: true,
            message: "credentail updated",
            user: updatedUser,
          });
        } else {
          const hash = await bcrypt.hash(pass, 10);
          const updated = await adminModel.findOneAndUpdate(
            {},
            {
              fullName: fullName,
              login: login,
              password: hash,
              passwordChanged: true,
            },
            { new: true }
          );
          const updatedObj = updated.toObject();
          const { password, ...updatedUser } = updatedObj;
          return res.json({
            ok: true,
            message: "credentail updated",
            user: updatedUser,
          });
        }
      }
      return res.json({ message: "old password is wrong" });
    } else {
      if (fullName == "admin" || pass == "admin") {
        return res.json({
          message: "please change your fullName and password",
        });
      }
      const hash = await bcrypt.hash(pass, 10);
      const updated = await adminModel.findOneAndUpdate(
        {},
        {
          fullName: fullName,
          login: login,
          password: hash,
          passwordChanged: true,
        },
        { new: true }
      );
      const updatedObj = updated.toObject();
      const { password, ...updatedUser } = updatedObj;

      return res.json({
        ok: true,
        message: "credentail updated",
        user: updatedUser,
      });
    }
  } catch (err) {
    return res.json({ message: "internal server error" });
  }
});

module.exports = router;
