const express = require('express');
const cors = require('cors');
const authRoutes = require('../routes/authRoutes');
const hospitalRoutes = require('../routes/hospitalRoutes');
const errorMiddleware = require('../middlewares/errorMiddleware');
const appointmentRoutes = require('../routes/appointmentRoutes');
const reportRoutes = require('../routes/reportRoutes');
const startReminderService = require('../services/mail');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', hospitalRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/reports', reportRoutes);

app.use(errorMiddleware);

startReminderService();

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;

