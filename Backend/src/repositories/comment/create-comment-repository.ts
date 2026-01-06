import { db } from "../../database/db";
import { Comment } from "../../models/Comment";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

export class CreateCommentRepository {
  async create(comment: Comment): Promise<number> {
    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      const [userRows] = await conn.query<RowDataPacket[]>(
        "SELECT id FROM users WHERE id = ?",
        [comment.user_id]
      );

      if (userRows.length === 0) {
        throw new Error("Usuário não existe");
      }

      const [postRows] = await conn.query<RowDataPacket[]>(
        "SELECT id FROM posts WHERE id = ?",
        [comment.post_id]
      );

      if (postRows.length === 0) {
        throw new Error("Post não existe");
      }

      const [result] = await conn.execute<ResultSetHeader>(
        `INSERT INTO comments (content, post_id, user_id)
         VALUES (?, ?, ?)`,
        [comment.content, comment.post_id, comment.user_id]
      );

      const commentId = result.insertId;

      await conn.commit();
      return commentId;

    } catch (error) {
      await conn.rollback();
      throw error;

    } finally {
      conn.release();
    }
  }
}
