import { Request, Response } from "express";
import { DeleteCategoryRepository } from "../../repositories/category/delete-category-repository";

const repository = new DeleteCategoryRepository();

export class DeleteCategoryController {
  async delete(req: Request, res: Response) {
    await repository.delete(Number(req.params.id));
    return res.status(204).send({
      menssage: "Category Deletado com Sucesso!"
    });
  }
}
