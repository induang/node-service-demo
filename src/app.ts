import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import UserController from './controllers/user';
import errorLoggerMiddleware from './middleware/errorLogger';
import requestLoggerMiddleware from './middleware/requestLogger';
import indexRouter from './routers';
import { corsOption } from './utils/corsOptions';

const app = express();

// see options to alter your origin
app.use(cors(corsOption));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// log request
app.use(requestLoggerMiddleware);

app.use('/login', UserController.login);

app.use('/api', indexRouter);

// log and send error message
app.use(errorLoggerMiddleware);

export default app;
