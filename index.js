import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import apiRouter from './api/router.js';

// Load .env file
dotenv.config();

// Get Port from .env file
const port = process.env.PORT || 3000;
const host_name = process.env.HOST_NAME || 'localhost'

// Cors settings
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
  port: port,
};

// Error handler for any errors
const errorHandler = (error, req, res, next) => {
  // Logging the error here
  console.log(error);
  // Returning the status and error message to client
  return res.status(400).json({
    error: true,
    message: error.message,
  });
}


// Initialize Express
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(errorHandler);

app.use('/api/', apiRouter);

/**
 * Routes
 */

// Express server config
app.listen(port, host_name, () => {
  console.log('Express server is listening on port %d in %s mode', port, app.settings.env);
});

export default app;