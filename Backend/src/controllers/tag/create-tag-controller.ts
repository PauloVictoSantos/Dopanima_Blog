import { Request, Response } from "express";
import { CreateTagReposiory } from "../../repositories/tag/create-tag-repository";

const repository = new CreateTagReposiory();

export class CreateTagController {
  async create(req: Request, res: Response) {
    const id = await repository.create(req.body);
    return res.status(201).json({
      menssage: "Tag Criado com Sucesso!",
      tag_id: id,
    });
  }
}
