import { Exercise_Busuu } from './../models/exercise';
import { Sequelize } from "sequelize-typescript";
import { User_Busuu } from "../models/user";

const connection = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: true,
  models: [User_Busuu, Exercise_Busuu],
});

export default connection;