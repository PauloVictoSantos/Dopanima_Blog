import { db } from "../../database/db";
import { Category } from "../../models/Category";

export class UpdateCategoryRepository {
  async update(id: number, category: Partial<Category>): Promise<void> {
    await db.execute(
      `UPDATE category SET 
        name = ?, 
        slug = ?
       WHERE id = ?`,
      [category.name, category.slug, id]
    );
  }
}
