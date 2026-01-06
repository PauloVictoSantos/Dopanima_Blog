import { Request, Response } from "express";
import { GetCategoryRepository } from "../../repositories/category/get-category-repository";

const repository = new GetCategoryRepository();

export class GetCategoryController {
  async index(req: Request, res: Response) {
    const categorys = await repository.findAll();
    return res.json(categorys);
  }

  async show(req: Request, res: Response) {
    const category = await repository.findById(Number(req.params.id));

    if (!category) {
      return res.status(404).json({ message: "Category não encontrado" });
    }

    return res.json(category);
  }
}
