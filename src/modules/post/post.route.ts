import { Router } from "express";
import { PostController } from "./post.controller";

const router = Router();

router.post("/", PostController.createPost);
router.get("/", PostController.getAllPosts);

router.get("/learn-query", PostController.learnAggregateAndGroupting);

router.get("/:id", PostController.getSinglePost);
router.patch("/:id", PostController.updatePost);
router.delete("/:id", PostController.deletePost);

export const PostRoutes = router;
