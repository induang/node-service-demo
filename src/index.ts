import * as dotenv from 'dotenv';
dotenv.config();
import db from './models';
import logger from './loggers';
import app from './app';


const port = process.env.PORT || 3003;

function createHttpServer() {
  const httpServer = db.sequelize.sync().then(() => {
    app.listen(port, () => {
      logger.info('Hello, Welcome to express!');
      logger.info(`You are on port: ${port}.`);
    });
  });
  return httpServer;
}
createHttpServer();

process.on('uncaughtException', (error: Error) => {
  logger.error('uncaughtException: ', error);
});

process.on('unhandledRejection', (error: Error) => {
  logger.error('unhandledRejection: ', error);
});

export default createHttpServer;
