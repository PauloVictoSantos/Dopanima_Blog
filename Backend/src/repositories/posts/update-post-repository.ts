import { db } from "../../database/db";
import { Post } from "../../models/Post";

export class UpdatePostRepository {
  async update(id: number, post: Partial<Post>): Promise<void> {
    await db.execute(
      `UPDATE posts SET 
        title = ?, 
        slug = ?, 
        excerpt = ?, 
        content = ?, 
        published = ?
       WHERE id = ?`,
      [post.title, post.slug, post.excerpt, post.content, post.published, id]
    );
  }
}
