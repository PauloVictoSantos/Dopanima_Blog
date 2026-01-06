import { Request, Response } from "express";
import { CreateCommentRepository } from "../../repositories/comment/create-comment-Repository";

export class CreateCommentController {
  async create(req: Request, res: Response) {
    try {
      const repository = new CreateCommentRepository();
      const commentId = await repository.create(req.body);

      return res.status(201).json({
        message: "Comentário criado com sucesso",
        comment_id: commentId,
      });

    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "Erro ao criar comentário",
      });
    }
  }
}
