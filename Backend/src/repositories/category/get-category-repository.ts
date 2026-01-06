import { db } from "../../database/db";
import { Category } from "../../models/Category";

export class GetCategoryRepository {
  async findAll(): Promise<Category[]> {
    const [rows] = await db.execute("SELECT * FROM category");
    return rows as Category[];
  }

  async findById(id: number): Promise<Category | null> {
    const [rows] = await db.execute("SELECT * FROM category WHERE id = ?", [id]);

    const categorys = rows as Category[];
    return categorys.length ? categorys[0] : null;
  }
}
