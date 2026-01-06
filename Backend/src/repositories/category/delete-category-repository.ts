import { db } from "../../database/db";

export class DeleteCategoryRepository {
  async delete(id: number): Promise<void> {
    await db.execute("DELETE FROM category WHERE id = ?", [id]);
  }
}
