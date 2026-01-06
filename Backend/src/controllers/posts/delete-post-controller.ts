import { Request, Response } from "express";
import { DeletePostRepository } from "../../repositories/posts/delete-post-repository";

const repository = new DeletePostRepository();

export class DeletePostController {
  async delete(req: Request, res: Response) {
    await repository.delete(Number(req.params.id));
    return res.status(204).send({
      menssage: "Post Deletado com Sucesso!"
    });
  }
}
