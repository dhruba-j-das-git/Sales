import express from 'express';
import { initDatabase } from './database/config.js';
import salesRoutes from './routes/sales.js';

const app = express();
const port = 3000;

app.use(express.json());

// Initialize database before setting up routes
async function startServer() {
  await initDatabase();
  
  // Routes
  app.use('/api/sales', salesRoutes);

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer().catch(console.error);