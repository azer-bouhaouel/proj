const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const employeeModel = require("../models/employeeModel");
const clientModel = require("../models/clientModel");
const adminModel = require("../models/adminModel");
const installationModel = require("../models/installationModel");

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

    return res.json({ message: "employee added successfully" });
  } catch (err) {
    return res.json({ message: "internal server error" });
  }
});

router.post("/addClient", async (req, res) => {
  const { fullName, email, cin, phone, address } = req.body;

  if (!fullName || !email || !address || !phone || !cin) {
    return res.json({ message: "some data are missing" });
  }

  try {
    const clientFound = await clientModel.findOne({ cin: cin });

    if (clientFound) {
      return res.json({ message: "client already exists" });
    }

    await clientModel.create({
      fullName: fullName,
      email: email,
      cin: cin,
      phone: phone,
      address: address,
    });

    return res.json({ message: "client added successfully" });
  } catch (err) {
    return res.json({ message: "internale server error" });
  }
});

router.post("/addInstallation", async (req, res) => {
  const { date, description, address, client, manager, panels } = req.body;

  if (!date || !address || !client || !manager || !panels) {
    return res.json({ message: "some data are missing" });
  }
  try {
    await installationModel.create({
      date: date,
      description: description,
      address: address,
      clientId: client,
      managerId: manager,
      panels: panels,
    });

    return res.json({ message: "installation created successfully" });
  } catch (err) {
    return res.json({ message: "internale server error" });
  }
});

router.post("/changeCredential", async (req, res) => {
  const { fullName, login } = req.body;
  const pass = req.body.password;

  if (!fullName || !login || !pass) {
    return res.json({ message: "some data are missing" });
  }

  if (fullName == "admin" || pass == "admin") {
    return res.json({ message: "please change your fullName and password" });
  }
  try {
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

    return res.json({ message: "credentail updated", user: updatedUser });
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
    return res.json({ message: "success", employees: employees });
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
    return res.json({ message: "success", managers: managers });
  } catch (err) {
    return res.json({ message: "internal server error" });
  }
});

router.get("/getClients", async (req, res) => {
  try {
    let clients = await clientModel.find();
    clients = clients.reverse();
    return res.json({ message: "success", clients: clients });
  } catch (err) {
    return res.json({ message: "internal server error" });
  }
});

router.get("/getInstallations", async (req, res) => {
  try {
    const installations = await installationModel.find().sort({ date: -1 });
    const resultList = await Promise.all(
      installations.map(async (installation) => {
        let installationObject = installation.toObject();
        const { clientId, managerId } = installationObject;
        const client = await clientModel.findById(clientId);
        const manager = await employeeModel
          .findById(managerId)
          .select("-password -passwordChanged -login");
        installationObject = {
          ...installationObject,
          client: client,
          manager: manager,
        };
        return installationObject;
      })
    );
    return res.json({ message: "success", installations: resultList });
  } catch (err) {
    return res.json({ message: "internal server error" });
  }
});

module.exports = router;
