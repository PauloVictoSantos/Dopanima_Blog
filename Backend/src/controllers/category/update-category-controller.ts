import { Request, Response } from "express";
import { UpdateCategoryRepository } from "../../repositories/category/update-category-repository";

const repository = new UpdateCategoryRepository();

export class UpdateCategoryController {
  async update(req: Request, res: Response) {
    await repository.update(Number(req.params.id), req.body);
    return res.status(204).send({
      menssage: "Category Alerado com sucesso!"
    });
  }
}
