const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
require('dotenv').config();

const roomRoutes = require('./routes/roomRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(helmet());
app.use(cors({
  origin: ['https://smart-hostel-system-2.onrender.com'],
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/rooms', roomRoutes);

app.get('/', (req, res) => {
  res.send('Smart Hostel Room Allocation System API');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
