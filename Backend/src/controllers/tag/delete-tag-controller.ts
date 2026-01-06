import { Request, Response } from "express";
import { DeleteTagRepository } from "../../repositories/tag/delete-tag-repository";

const repository = new DeleteTagRepository();

export class DeleteTagController {
  async delete(req: Request, res: Response) {
    await repository.delete(Number(req.params.id));
    return res.status(204).send({
      menssage: "Tag Deletado com Sucesso!"
    });
  }
}
