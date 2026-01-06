import { db } from "../../database/db";
import { RowDataPacket } from "mysql2/promise";

export class GetPostRepository {

  async findById(id: number) {
    const [postRows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM posts WHERE id = ?",
      [id]
    );

    if (postRows.length === 0) return null;

    const post = postRows[0];

    const [categories] = await db.query<RowDataPacket[]>(
      `
      SELECT c.id, c.name, c.slug
      FROM category c
      INNER JOIN post_categorys pc ON pc.category_id = c.id
      WHERE pc.post_id = ?
      `,
      [id]
    );

    const [tags] = await db.query<RowDataPacket[]>(
      `
      SELECT t.id, t.name, t.slug
      FROM tags t
      INNER JOIN post_tags pt ON pt.tag_id = t.id
      WHERE pt.post_id = ?
      `,
      [id]
    );

    const [comments] = await db.query<RowDataPacket[]>(
      `
      SELECT 
        c.id,
        c.content,
        c.created_at,
        u.id   AS user_id,
        u.name AS user_name
      FROM comments c
      INNER JOIN users u ON u.id = c.user_id
      WHERE c.post_id = ?
      ORDER BY c.created_at DESC
      `,
      [id]
    );

    return {
      ...post,
      categories,
      tags,
      comments: comments.map(comment => ({
        id: comment.id,
        content: comment.content,
        created_at: comment.created_at,
        user: {
          id: comment.user_id,
          name: comment.user_name
        }
      }))
    };
  }
}
