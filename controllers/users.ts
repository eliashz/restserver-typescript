import { Request, Response } from "express";
import User from "../models/user";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();

  res.json({ users });
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user)
    return res.status(404).json({ msg: `User with ID ${id} doesn't exist` });

  res.json(user);
};

export const postUser = (req: Request, res: Response) => {
  const { body } = req;
  console.log(body);

  res.json({ msg: "postUser", body });
};

export const putUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  res.json({ msg: "putUser", body, id });
};

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({ msg: "deleteUser", id });
};
