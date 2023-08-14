import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUser(req.body);
    res.send({
      success: true,
      statusCode: 400,
      message: "User created successfully!",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const createOrUpdateProfile = async (req: Request, res: Response) => {
  try {
    const result = await userService.createOrUpdateProfile(req.body);
    res.send({
      success: true,
      statusCode: 400,
      message: "Profile created/updated successfully!",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsers();
    res.send({
      success: true,
      statusCode: 400,
      message: "Users served successfully!",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userService.getSingleUser(parseInt(id));
    res.send({
      success: true,
      statusCode: 400,
      message: "User served successfully!",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

export const userController = {
  createUser,
  createOrUpdateProfile,
  getAllUsers,
  getSingleUser,
};
