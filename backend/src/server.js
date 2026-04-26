import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// ── Routes ──────────────────────────────────────────────────────────────────
import authRoutes       from './routes/auth.js';
import userRoutes       from './routes/users.js';
import apartmentRoutes  from './routes/apartments.js';
import complaintRoutes  from './routes/complaints.js';
import paymentRoutes    from './routes/payments.js';
import propertyRoutes   from './routes/properties.js';

dotenv.config();

// ── App ──────────────────────────────────────────────────────────────────────
const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Connect DB (non-blocking – server starts even if DB is not configured) ───
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// ── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/auth',       authRoutes);
app.use('/api/users',      userRoutes);
app.use('/api/apartments', apartmentRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/payments',   paymentRoutes);
app.use('/api/properties', propertyRoutes);

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) =>
  res.json({ status: 'ok', time: new Date().toISOString() })
);

// ── 404 fallback ─────────────────────────────────────────────────────────────
app.use((_req, res) => res.status(404).json({ message: 'Route not found' }));

// ── Global error handler ─────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('[unhandled error]', err);
  res.status(500).json({ message: err.message || 'Internal server error' });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('  Backend running at http://localhost:${PORT}');
  console.log('  Health → http://localhost:${PORT}/api/health');
});
