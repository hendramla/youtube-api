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


/**
 * Routes
*/
app.get('/', function (req, res) {
  return res.json({
    success: true,
    routes: {
      '/api/': 'Home Page to get home feed',
      '/api/trending': 'Trending videos and reels',
      '/api/shopping': 'Browse products',
      '/api/music': 'Music videos, Album',
      '/api/movies': 'Browse movies',
      '/api/live': 'Live Streaming',
      '/api/gaming': 'Gaming videos, streams and video games',
      '/api/news': 'Live News Channels, News clips and videos',
      '/api/sports': 'Sports news and highlight videos',
      '/api/learning': 'Educational video and posts',
      '/api/fashion': 'Fashion page video and posts',
      '/api/channels': 'Browse Channels',
      '/api//playlist/:id': 'Playlist',
      '/api/channel/:id': 'Get channel by ID',
      '/api/watch/:id': 'Video details and comments with replies',
      '/api/watch/:id/comments': 'Load more comments',
      '/api/watch/:id/suggestions': 'Load more video suggestions',
      '/api/search': 'Search videos',
    }
  })
});

app.use('/api/', apiRouter);

// Express server config
app.listen(port, () => {
  console.log('Express server is listening on port %d in %s mode', port, app.settings.env);
});

export default app;
