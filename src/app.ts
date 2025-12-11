import express, { Express, Request, Response } from 'express';
import 'dotenv/config';
import userRoutes from './routes/userRoutes';
import prisma from './prisma';

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User routes
app.use('/users', userRoutes);

// Health check endpoint
app.get('/health', async(_req: Request, res: Response) => {
  try {
    await prisma.$connect();
    res.status(200).json({ status: 'API is running and database is connected.', timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ status: 'error', message: 'API is running but database connection failed.' });
  }
});

// Root endpoint
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Todo API is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

export default app;

