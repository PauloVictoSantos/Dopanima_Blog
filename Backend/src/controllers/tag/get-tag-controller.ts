import { Request, Response } from "express";
import { GetTagRepository } from "../../repositories/tag/get-tag-repository";

const repository = new GetTagRepository();

export class GetTagController {
  async index(req: Request, res: Response) {
    const tags = await repository.findAll();
    return res.json(tags);
  }

  async show(req: Request, res: Response) {
    const tag = await repository.findById(Number(req.params.id));

    if (!tag) {
      return res.status(404).json({ message: "Tag não encontrado" });
    }

    return res.json(tag);
  }
}
