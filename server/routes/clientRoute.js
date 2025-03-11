const express = require("express");
const router = express.Router();
const clientModel = require("../models/clientModel");

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

    return res.json({ ok: true, message: "client added successfully" });
  } catch (err) {
    return res.json({ message: "internale server error" });
  }
});

router.get("/getClients", async (req, res) => {
  try {
    let clients = await clientModel.find();
    clients = clients.reverse();
    return res.json({ ok: true, message: "success", clients: clients });
  } catch (err) {
    return res.json({ message: "internal server error" });
  }
});

router.get("/getClient/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const client = await clientModel.findById(id);
    if (client) {
      return res.json({ ok: true, message: "success", client: client });
    }
    return res.json({ message: "client doen't exist" });
  } catch (err) {
    return res.json({ message: "internal server error" });
  }
});

router.put("/updateClient", async (req, res) => {
  const { _id, fullName, cin, email, phone, address } = req.body;
  if (!_id || !fullName || !cin || !email || !phone || !address) {
    return res.json({ message: "some fields are required" });
  }
  try {
    await clientModel.findByIdAndUpdate(
      { _id: _id },
      {
        fullName: fullName,
        cin: cin,
        email: email,
        phone: phone,
        address: address,
      }
    );
    return res.json({ ok: true, message: "client updated successfully" });
  } catch (err) {
    return res.json({ message: "internal server error" });
  }
});

router.delete("/deleteClient/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.json({ message: "no id found" });
  }

  try {
    await clientModel.findByIdAndDelete(id);
    return res.json({ ok: true, message: "client deleted successfully" });
  } catch (err) {
    return res.json({ message: "internal server error" });
  }
});

module.exports = router;
