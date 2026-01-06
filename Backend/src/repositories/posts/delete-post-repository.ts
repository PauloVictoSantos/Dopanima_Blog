import { db } from "../../database/db";

export class DeletePostRepository {
  async delete(id: number): Promise<void> {
    await db.execute("DELETE FROM posts WHERE id = ?", [id]);
  }
}
