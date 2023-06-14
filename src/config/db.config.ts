import { Exercise } from './../models/exercise';
import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user";

const connection = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
  models: [User, Exercise],
});

export default connection;