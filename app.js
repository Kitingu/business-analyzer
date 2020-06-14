import express from 'express';
import morgan from 'morgan';
import ErrorHandler from './src/utils/error-handler';
import {handleError,handleSuccess} from './src/utils/response'
import authRoutes from './src/routes/auth'
import logger from './src/utils/logger';
const app = express();


app.use(express.json());
app.use(morgan('dev'));
app.use(authRoutes)

app.use((req, res) =>
  handleError(404, 'Route not found or invalid Method', res)
);

const PORT = 3000;
app.set('port', PORT || 3102);
const server = app.listen(app.get('port'), () => {
  logger.info(`app running 🚀 → PORT ${server.address().port}`);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  logger.error(
    `${err.statusCode || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip} - Stack: ${err.stack}`
  );
  return handleError(err.statusCode || 500, err.message, res);
});

process.on('unhandledRejection', (reason) => {
  throw new ErrorHandler(reason);
});

process.on('uncaughtException', (error) => {
  logger.error(
    `Uncaught Exception: ${500} - ${error.message}, Stack: ${error.stack}`
  );
  process.kill(process.pid, 'SIGTERM');
});

// Gracefull shut downs.
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received.');
  logger.info('Closing http server.');
  server.close(() => {
    logger.info('Http server closed.');
  });
});
