import { db } from "../../database/db";
import { Tag } from "../../models/Tag";

export class UpdateTagRepository {
  async update(id: number, tag: Partial<Tag>): Promise<void> {
    await db.execute(
      `UPDATE tags SET 
        name = ?, 
        slug = ?
       WHERE id = ?`,
      [tag.name, tag.slug, id]
    );
  }
}
