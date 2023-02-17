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

export const postUser = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const emailExists = await User.findOne({
      where: {
        email: body.email,
      },
    });
    console.log(emailExists);
    if (emailExists || emailExists)
      return res.status(400).json({
        msg: "User with this e-mail already exits.",
      });

    const user = await User.create(body);
    console.log(user);

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ ehh: error });
  }
};

export const putUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const user = await User.findByPk(id);

    if (!user)
      return res.status(400).json({ msg: `User with ID ${id} not exits.` });

    await user.update(body);

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ ehh: error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    let user = {} as any;
    user = await User.findByPk(id);

    if (!user || !user.status)
      return res.status(400).json({ msg: `User with ID ${id} not exits.` });

    user.set({ status: 0 });
    await user.save();

    res.json({ msg: "User deleted", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ehh: error });
  }
};
