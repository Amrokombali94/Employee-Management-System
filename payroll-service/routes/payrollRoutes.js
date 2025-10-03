const express = require('express');
const Payroll = require('../models/Payroll');

const router = express.Router();

// Get all payroll records
router.get('/', async (req, res) => {
  const records = await Payroll.find();
  res.json(records);
});

// Create new payroll record
router.post('/', async (req, res) => {
  try {
    const record = new Payroll(req.body);
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get single payroll record
router.get('/:id', async (req, res) => {
  try {
    const record = await Payroll.findById(req.params.id);
    if (!record) return res.status(404).json({ error: 'Not found' });
    res.json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update payroll record
router.put('/:id', async (req, res) => {
  try {
    const updated = await Payroll.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete payroll record
router.delete('/:id', async (req, res) => {
  try {
    await Payroll.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
