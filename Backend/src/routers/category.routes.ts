import { Router } from "express";
import { CreateCategoryController } from "../controllers/category/create-category-controller";
import { GetCategoryController } from "../controllers/category/get-category-controller";
import { UpdateCategoryController } from "../controllers/category/update-category-controller";
import { DeleteCategoryController } from "../controllers/category/delete-category-controller";

const routes = Router();

const createCategoryController = new CreateCategoryController();
const getCategoryController = new GetCategoryController();
const updateCategoryController = new UpdateCategoryController();
const deleteCategoryController = new DeleteCategoryController();

routes.post("/categorys", createCategoryController.create);
routes.get("/categorys", getCategoryController.index);
routes.get("/categorys/:id", getCategoryController.show);
routes.put("/categorys/:id", updateCategoryController.update);
routes.delete("/categorys/:id", deleteCategoryController.delete);

export default routes;
