const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const employeeModel = require("../models/employeeModel");

router.post("/addEmployee", async (req, res) => {
  const { fullName, email, cin, phone, address, role } = req.body;

  if (!fullName || !email || !address || !phone || !cin || !role) {
    return res.json({ message: "some data are missing" });
  }

  try {
    const employeeFound = await employeeModel.findOne({ cin: cin });

    if (employeeFound) {
      return res.json({ message: "employee already exists" });
    }

    const hash = await bcrypt.hash(cin, 10);

    await employeeModel.create({
      fullName: fullName,
      email: email,
      cin: cin,
      login: cin,
      phone: phone,
      address: address,
      role: role,
      password: hash,
      passwordChanged: false,
    });

    return res.json({ ok: true, message: "employee added successfully" });
  } catch (err) {
    return res.json({ message: "internal server error" });
  }
});

router.get("/getEmployees", async (req, res) => {
  try {
    let employees = await employeeModel
      .find()
      .select("-password -passwordChanged -login");
    employees = employees.reverse();
    return res.json({ ok: true, message: "success", employees: employees });
  } catch (err) {
    return res.json({ message: "internal server error" });
  }
});

router.get("/getManagers", async (req, res) => {
  try {
    let managers = await employeeModel
      .find({ role: "project manager" })
      .select("-password -passwordChanged -login");
    managers = managers.reverse();
    return res.json({ ok: true, message: "success", managers: managers });
  } catch (err) {
    return res.json({ message: "internal server error" });
  }
});

router.get("/getEmployee/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await employeeModel.findById(id);
    if (employee) {
      return res.json({ ok: true, message: "success", employee: employee });
    }
    return res.json({ message: "employee doen't exist" });
  } catch (err) {
    return res.json({ message: "internal server error" });
  }
});

router.put("/updateEmployee", async (req, res) => {
  const { _id, fullName, cin, email, phone, address, role } = req.body;
  if (!_id || !fullName || !cin || !email || !phone || !address || !role) {
    return res.json({ message: "some fields are required" });
  }
  try {
    await employeeModel.findByIdAndUpdate(
      { _id: _id },
      {
        fullName: fullName,
        cin: cin,
        login: cin,
        email: email,
        phone: phone,
        address: address,
        role: role,
      }
    );
    return res.json({ ok: true, message: "employee updated successfully" });
  } catch (err) {
    return res.json({ message: "internal server error" });
  }
});

router.delete("/deleteEmployee/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.json({ message: "no id found" });
  }

  try {
    await employeeModel.findByIdAndDelete(id);
    return res.json({ ok: true, message: "employee deleted successfully" });
  } catch (err) {
    return res.json({ message: "internal server error" });
  }
});

module.exports = router;
