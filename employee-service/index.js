const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/employees', employeeRoutes);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/employee-service', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Employee Service running on http://localhost:${PORT}`));
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
