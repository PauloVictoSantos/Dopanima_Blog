import { Request, Response } from "express";
import { UpdatePostRepository } from "../../repositories/posts/update-post-repository";

const repository = new UpdatePostRepository();

export class UpdatePostController {
  async update(req: Request, res: Response) {
    await repository.update(Number(req.params.id), req.body);
    return res.status(204).send({
      menssage: "Post Alerado com sucesso!"
    });
  }
}
