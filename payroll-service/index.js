const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const payrollRoutes = require('./routes/payrollRoutes');

const app = express();
const PORT = 3004;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/payroll', payrollRoutes);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/payroll-service', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Payroll Service running on http://localhost:${PORT}`));
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
