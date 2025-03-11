const express = require("express");
const router = express.Router();
const clientModel = require("../models/clientModel");
const installationModel = require("../models/installationModel");
const employeeModel = require("../models/employeeModel");

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

    return res.json({ ok: true, message: "installation created successfully" });
  } catch (err) {
    return res.json({ message: "internale server error" });
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
    return res.json({
      ok: true,
      message: "success",
      installations: resultList,
    });
  } catch (err) {
    return res.json({ message: "internal server error" });
  }
});

router.get("/getInstallation/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let installation = await installationModel.findById(id);
    if (installation) {
      const manager = await employeeModel
        .findOne({ _id: installation.managerId })
        .select("-password -passwordChanged -login");
      installation = installation.toObject();
      installation = { ...installation, manager: manager };
      return res.json({
        ok: true,
        message: "success",
        installation: installation,
      });
    }
    return res.json({ message: "installation doen't exist" });
  } catch (err) {
    return res.json({ message: "internal server error" });
  }
});

router.put("/updateInstallation", async (req, res) => {
  const { _id, managerId, address, description, panels } = req.body;
  if (!_id || !managerId || !address || !description || !panels) {
    return res.json({ message: "some fields are required" });
  }
  try {
    await installationModel.findByIdAndUpdate(
      { _id: _id },
      {
        managerId: managerId,
        address: address,
        description: description,
        panels: panels,
      }
    );
    return res.json({ ok: true, message: "installation updated successfully" });
  } catch (err) {
    return res.json({ message: "internal server error" });
  }
});

router.delete("/deleteInstallation/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.json({ message: "no id found" });
  }

  try {
    await installationModel.findByIdAndDelete(id);
    return res.json({ ok: true, message: "installation deleted successfully" });
  } catch (err) {
    return res.json({ message: "internal server error" });
  }
});

module.exports = router;
