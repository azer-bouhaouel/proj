const express = require("express");
const router = express.Router();
const toolModel = require("../models/toolModel");

router.post("/addTools", async (req, res) => {
  const { name, quantity } = req.body;
  if (!name || !quantity) {
    return res.json({ message: "some data are missing" });
  }

  try {
    await toolModel.create({ name: name, quantity: quantity });
    return res.json({ ok: true, message: "tool added successfully" });
  } catch (err) {
    return res.json({ message: "internal server error" });
  }
});

router.put("/updateTool", async (req, res) => {
  const { _id, name, qunatity } = req.body;
  if (!_id || !name || !qunatity) {
    return res.json({ message: "some fields are required" });
  }
  try {
    await toolModel.findByIdAndUpdate(
      { _id: _id },
      {
        name: name,
        quantity: quantity,
      }
    );
    return res.json({ ok: true, message: "tool updated successfully" });
  } catch (err) {
    return res.json({ message: "internal server error" });
  }
});

router.delete("/deleteTool/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.json({ message: "no id found" });
  }

  try {
    await toolModel.findByIdAndDelete(id);
    return res.json({ ok: true, message: "tool deleted successfully" });
  } catch (err) {
    return res.json({ message: "internal server error" });
  }
});

module.exports = router;
