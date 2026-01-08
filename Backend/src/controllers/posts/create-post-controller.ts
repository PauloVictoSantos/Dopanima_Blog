import { Request, Response } from "express";
import { CreatePostRepository } from "../../repositories/posts/create-post-Repository";

export class CreatePostController {
  async create(req: Request, res: Response) {
    try {
      const repository = new CreatePostRepository();

      const files = req.files as Express.Multer.File[];

      const postId = await repository.create(req.body, files);

      return res.status(201).json({
        message: "Post criado com sucesso",
        post_id: postId,
      });

    } catch (error: any) {
      return res.status(error.statusCode || 500).json({
        error: true,
        message: error.message || "Erro interno do servidor",
      });
    }
  }
}
