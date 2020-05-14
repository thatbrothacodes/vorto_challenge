import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import controllers from './controllers';
import db from './models';

const app = express();
const router = express.Router();
const port: number = parseInt(process.env.PORT) || 4000;
const environment: string = process.env.NODE_ENV || "development";

// include error handling
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
  console.log(req.method, req.url);
  next();
});

app.use('/', controllers(router, db));

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log("environment: " + environment);
    console.log(`Example app listening on port ${port}`);
  });
});
