import { Request, Response } from "express";
import { CreatePostRepository } from "../../repositories/posts/create-post-Repository";

export class CreatePostController {
  async create(req: Request, res: Response) {
    try {
      const repository = new CreatePostRepository();
      const postId = await repository.create(req.body);

      return res.status(201).json({
        message: "Post criado com sucesso",
        post_id: postId,
      });

    } catch (error) {
      return res.status(400).json({
        message: "Uma ou mais categorias não existem",
      });
    }
  }
}
