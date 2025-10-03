const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  baseSalary: { type: Number, required: true },
  bonus: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  payDate: { type: Date, default: Date.now }
}, { timestamps: true });

const Payroll = mongoose.model('Payroll', payrollSchema);

module.exports = Payroll;
