import { db } from "../../database/db";
import { Post } from "../../models/Post";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import slugify from "slugify";
import { AppError } from "../../errors/AppError";

export class CreatePostRepository {
  async create(
    post: Post,
    files: Express.Multer.File[]
  ): Promise<number> {
    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      const slug = `${slugify(post.title, {
        lower: true,
        strict: true,
      })}-${Date.now()}`;

      const [result] = await conn.execute<ResultSetHeader>(
        `INSERT INTO posts 
         (title, slug, excerpt, content, published, user_id) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          post.title,
          slug,
          post.excerpt,
          post.content,
          post.published,
          post.user_id,
        ]
      );

      const postId = result.insertId;

      // 🔹 salvar imagens
      if (files && files.length > 0) {
        for (const file of files) {
          await conn.query(
            `INSERT INTO images 
             (post_id, filename, original_name, mime_type, size, url, is_cover)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
              postId,
              file.filename,
              file.originalname,
              file.mimetype,
              file.size,
              `/uploads/posts/${file.filename}`,
              false,
            ]
          );
        }
      }

      // 🔹 categorias
      if (post.categories && post.categories.length > 0) {
        const categories = post.categories.map(Number);

        const [categoryRows] = await conn.query<RowDataPacket[]>(
          "SELECT id FROM category WHERE id IN (?)",
          [categories]
        );

        if (categoryRows.length !== categories.length) {
          throw new AppError("Uma ou mais categorias não existem", 400);
        }

        const categoryValues = categories.map((categoryId) => [
          postId,
          categoryId,
        ]);

        await conn.query(
          "INSERT INTO post_categorys (post_id, category_id) VALUES ?",
          [categoryValues]
        );
      }

      // 🔹 tags
      if (post.tags && post.tags.length > 0) {
        const tags = post.tags.map(Number);

        const [tagRows] = await conn.query<RowDataPacket[]>(
          "SELECT id FROM tags WHERE id IN (?)",
          [tags]
        );

        if (tagRows.length !== tags.length) {
          throw new AppError("Uma ou mais tags não existem", 400);
        }

        const tagValues = tags.map((tagId) => [postId, tagId]);

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
