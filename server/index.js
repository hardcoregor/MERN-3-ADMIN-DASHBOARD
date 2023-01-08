import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';

//DATA IMPORT
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from './models/Transaction.js';
import OverallStat from './models/OverallStat.js';
import AffiliateStat from './models/AffiliateStat.js';
import { dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat, dataAffiliateStat } from "./data/index.js";

//CONFIGURATION
dotenv.config();
const app = express();
app.use(express.json()); //CONVERT BODY TO JSON
app.use(helmet()); //PROTECT OUR APP
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors()); //ALLOW ALL TYPES OF REQUESTS GET,PUT,DELETE etc..

//ROUTES
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use('/sales', salesRoutes);

//MONGOOSE SETUP
const PORT = process.env.PORT || 9000;
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(PORT, () => console.log(`Server PORT: ${PORT}`));

  // AffiliateStat.insertMany(dataAffiliateStat);
  // OverallStat.insertMany(dataOverallStat);
  // ProductStat.insertMany(dataProductStat);
  // User.insertMany(dataUser);
  // Product.insertMany(dataProduct);
  // Transaction.insertMany(dataTransaction)
  // Transaction.insertMany(dataTransaction)
}).catch((error) => console.log(`${error} did not connect`))