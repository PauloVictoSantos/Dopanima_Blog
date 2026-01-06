import { Router } from "express";
import { CreateTagController } from "../controllers/tag/create-tag-controller";
import { GetTagController } from "../controllers/tag/get-tag-controller";
import { UpdateTagController } from "../controllers/tag/update-tag-controller";
import { DeleteTagController } from "../controllers/tag/delete-tag-controller";

const routes = Router();

const createTagController = new CreateTagController();
const getTagController = new GetTagController();
const updateTagController = new UpdateTagController();
const deleteTagController = new DeleteTagController();

routes.post("/tags", createTagController.create);
routes.get("/tags", getTagController.index);
routes.get("/tags/:id", getTagController.show);
routes.put("/tags/:id", updateTagController.update);
routes.delete("/tags/:id", deleteTagController.delete);

export default routes;
