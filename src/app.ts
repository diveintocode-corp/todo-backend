import express, { Express, Request, Response } from 'express';
import 'dotenv/config';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import todoRoutes from './routes/todoRoutes';
import prisma from './prisma';
import { notFoundHandler } from './middleware/notFound';
import { mainErrorHandler } from './middleware/errorHandler';

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/todos', todoRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Todo API is running!' });
});

app.use(notFoundHandler);
app.use(mainErrorHandler);

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
