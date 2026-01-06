import { db } from "../../database/db";
import { Post } from "../../models/Post";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

export class CreatePostRepository {
  async create(post: Post): Promise<number> {
    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();
      const [result] = await conn.execute<ResultSetHeader>(
        `INSERT INTO posts 
        (title, slug, excerpt, content, published, user_id) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
          post.title,
          post.slug,
          post.excerpt,
          post.content,
          post.published,
          post.user_id,
        ]
      );

      const postId = result.insertId;

      if (post.categories && post.categories.length > 0) {
        const categories = post.categories.map(Number);

        const [categoryRows] = await conn.query<RowDataPacket[]>(
          "SELECT id FROM category WHERE id IN (?)",
          [categories]
        );

        if (categoryRows.length !== categories.length) {
          throw new Error("Uma ou mais categorias não existem");
        }

        const categoryValues = categories.map(
          (categoryId) => [postId, categoryId]
        );

        await conn.query(
          "INSERT INTO post_categorys (post_id, category_id) VALUES ?",
          [categoryValues]
        );
      }

      if (post.tags && post.tags.length > 0) {
        const tags = post.tags.map(Number);

        const [tagRows] = await conn.query<RowDataPacket[]>(
          "SELECT id FROM tags WHERE id IN (?)",
          [tags]
        );

        if (tagRows.length !== tags.length) {
          throw new Error("Uma ou mais tags não existem");
        }

        const tagValues = tags.map(
          (tagId) => [postId, tagId]
        );

        await conn.query(
          "INSERT INTO post_tags (post_id, tag_id) VALUES ?",
          [tagValues]
        );
      }

      await conn.commit();
      return postId;

    } catch (error) {
      await conn.rollback();
      throw error;

    } finally {
      conn.release();
    }
  }
}
