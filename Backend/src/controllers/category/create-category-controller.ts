import { Request, Response } from "express";
import { CreateCategoryReposiory } from "../../repositories/category/create-category-repository";

const repository = new CreateCategoryReposiory();

export class CreateCategoryController {
  async create(req: Request, res: Response) {
    const id = await repository.create(req.body);
    return res.status(201).json({
      menssage: "Category Criado com Sucesso!",
      category_id: id,
    });
  }
}
