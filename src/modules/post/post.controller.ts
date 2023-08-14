import { Request, Response } from "express";
import { PostService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await PostService.createPost(req.body);
    res.send({
      statusCode: 400,
      success: true,
      message: "Post Created Successfully!",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  const options = req.query;
  try {
    const result = await PostService.getAllPosts(options);
    res.send({
      statusCode: 400,
      success: true,
      message: "Posts Served Successfully!",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const getSinglePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await PostService.getSinglePost(parseInt(id));
    res.send({
      statusCode: 400,
      success: true,
      message: "Post Served Successfully!",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

export const PostController = {
  createPost,
  getAllPosts,
  getSinglePost,
};
