require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const academicRoutes = require('./routes/academic');
const eventsRoutes = require('./routes/events');
const sapRoutes = require('./routes/sap');
const financeRoutes = require('./routes/finance');
const examinationRoutes = require('./routes/examination');
const hostelRoutes = require('./routes/hostel');
const transportRoutes = require('./routes/transport');
const feedbackRoutes = require('./routes/feedback');
const announcementsRoutes = require('./routes/announcements');
const verificationRoutes = require('./routes/verification');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/academic', academicRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/sap', sapRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/examination', examinationRoutes);
app.use('/api/hostel', hostelRoutes);
app.use('/api/transport', transportRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/announcements', announcementsRoutes);
app.use('/api/verification', verificationRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
