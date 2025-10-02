const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
const PORT = 3005;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/notifications', notificationRoutes);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/notification-service', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Notification Service running on http://localhost:${PORT}`));
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
