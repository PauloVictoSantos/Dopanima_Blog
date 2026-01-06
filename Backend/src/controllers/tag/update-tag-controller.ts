import { Request, Response } from "express";
import { UpdateTagRepository } from "../../repositories/tag/update-tag-repository";

const repository = new UpdateTagRepository();

export class UpdateTagController {
  async update(req: Request, res: Response) {
    await repository.update(Number(req.params.id), req.body);
    return res.status(204).send({
      menssage: "Tag Alerado com sucesso!"
    });
  }
}
