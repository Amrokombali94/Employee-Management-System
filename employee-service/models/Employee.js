const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: String,
  email: { type: String, required: true, unique: true },
  department: String,
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
