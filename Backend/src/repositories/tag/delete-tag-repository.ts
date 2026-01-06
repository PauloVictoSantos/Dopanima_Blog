import { db } from "../../database/db";

export class DeleteTagRepository {
  async delete(id: number): Promise<void> {
    await db.execute("DELETE FROM tags WHERE id = ?", [id]);
  }
}
