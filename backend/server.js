const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
const ApiResponse = require('./utils/ApiResponse');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// --------------- Middleware ---------------

// Security headers
app.use(helmet());

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use('/api', limiter);

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// --------------- Routes ---------------

// Health check
app.get('/api/health', (req, res) => {
  ApiResponse.success(res, {
    status: 'running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  }, 'Attendify API is running');
});

// Mount route files here
app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/teachers', require('./routes/teacher.routes'));
// app.use('/api/students', require('./routes/student.routes'));
// app.use('/api/classes', require('./routes/class.routes'));
// app.use('/api/attendance', require('./routes/attendance.routes'));
// app.use('/api/tests', require('./routes/test.routes'));
// app.use('/api/timetables', require('./routes/timetable.routes'));
// app.use('/api/holidays', require('./routes/holiday.routes'));
// app.use('/api/reports', require('./routes/report.routes'));

// --------------- Error Handling ---------------

app.use(notFound);
app.use(errorHandler);

// --------------- Start Server ---------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Attendify Server running on port ${PORT} (${process.env.NODE_ENV})`);
});

module.exports = app;
