import bodyParser from 'body-parser';
import express from 'express';
import db from './models';
import indexRouter from './routers';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3003;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/api', indexRouter);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Hello, Welcome to express!\nYou are on port: ${port}.`);
  });
});

// console.log('models: ', db.sequelize);

