import express, { Express, Request, Response } from 'express';
import 'dotenv/config';
import userRoutes from './routes/userRoutes';
import prisma from './prisma';
import { notFoundHandler } from './middleware/notFound';
import { mainErrorHandler } from './middleware/errorHandler';

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User routes
app.use('/users', userRoutes);

// Root endpoint
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Todo API is running!' });
});

//Not found handler
app.use(notFoundHandler);

// Main error handler
app.use(mainErrorHandler);

// Start server
app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
});

export default app;

