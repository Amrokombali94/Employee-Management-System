const express = require('express');
const Department = require('../models/Department');

const router = express.Router();

// Get all departments
router.get('/', async (req, res) => {
  const departments = await Department.find();
  res.json(departments);
});

// Create new department
router.post('/', async (req, res) => {
  try {
    const department = new Department(req.body);
    await department.save();
    res.status(201).json(department);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get one department
router.get('/:id', async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).json({ error: 'Not found' });
    res.json(department);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update department
router.put('/:id', async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(department);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete department
router.delete('/:id', async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
