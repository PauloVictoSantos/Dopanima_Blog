import { Router } from "express";
import { CreatePostController } from "../controllers/posts/create-post-controller";
import { GetPostController } from "../controllers/posts/get-post-controller";
import { UpdatePostController } from "../controllers/posts/update-post-controller";
import { DeletePostController } from "../controllers/posts/delete-post-controller";

const routes = Router();

const createPostController = new CreatePostController();
const getPostController = new GetPostController();
const updatePostController = new UpdatePostController();
const deletePostController = new DeletePostController();

routes.post("/posts", createPostController.create);
routes.get("/posts", getPostController.findAll);
routes.get("/posts/:id", getPostController.show);
routes.put("/posts/:id", updatePostController.update);
routes.delete("/posts/:id", deletePostController.delete);

export default routes;
