import { Router } from "express";
import { CreateCommentController } from "../controllers/comment/create-comment-controllers";
// import { GetPostController } from "../controllers/posts/get-post-controller";
// import { UpdatePostController } from "../controllers/posts/update-post-controller";
// import { DeletePostController } from "../controllers/posts/delete-post-controller";

const routes = Router();

const createCommentController = new CreateCommentController();
// const getPostController = new GetPostController();
// const updatePostController = new UpdatePostController();
// const deletePostController = new DeletePostController();

routes.post("/comments", createCommentController.create);

// routes.get("/posts", getPostController.index);
// routes.get("/posts/:id", getPostController.show);
// routes.put("/posts/:id", updatePostController.update);
// routes.delete("/posts/:id", deletePostController.delete);

export default routes;
