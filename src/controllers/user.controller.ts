import { RequestHandler } from "express";
import { User_Busuu } from "../models/user";

export const createUser: RequestHandler = async (req, res, next) => {
  const user = await User_Busuu.create({ ...req.body });
  res.set('Access-Control-Allow-Origin', '*');
  return res
    .status(200)
    .json({ message: "User created successfully", data: user });
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  const { id } = req.params;
  const deletedUser: User_Busuu | null = await User_Busuu.findByPk(id);
  await User_Busuu.destroy({ where: { id } });
  return res
    .status(200)
    .json({ message: "User deleted successfully", data: deletedUser });
};

export const getAllUsers: RequestHandler = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  const allUsers: User_Busuu[] = await User_Busuu.findAll();
  return res
    .status(200)
    .json({ message: "User fetched successfully", data: allUsers });
};
