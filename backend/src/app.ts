import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import leadRoutes from './routes/lead.routes';
import adminRoutes from './routes/admin.routes';
import appointmentRoutes from './routes/appointment.routes';
import serviceRoutes from './routes/service.route';

const app = express();

app.use(cors());
app.use(express.json());

// Main Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/leads', leadRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/appointments', appointmentRoutes);
app.use('/api/v1/services', serviceRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API is running' });
});

export default app;
