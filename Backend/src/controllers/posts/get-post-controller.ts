import { Request, Response } from "express";
import { GetPostRepository } from "../../repositories/posts/get-post-repository";
import type { RowDataPacket } from "mysql2";
import { db } from "../../database/db";

export class GetPostController {
  async findAll() {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT id, title, slug, excerpt, created_at FROM posts ORDER BY id DESC"
    );

    return rows;
  }

  async show(req: Request, res: Response) {
    const id = Number(req.params.id);

    const repository = new GetPostRepository();
    const post = await repository.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post não encontrado" });
    }

    return res.json(post);
  }
}
