import { db } from "../../database/db";
import { Category } from "../../models/Category";
import { ResultSetHeader } from "mysql2";

export class CreateCategoryReposiory {
  async create(category: Category): Promise<number> {
    const [result] = await db.execute<ResultSetHeader>(
      `INSERT INTO category 
      (name, slug) 
      VALUES (?, ?)`,
      [category.name, category.slug]
    );

    return result.insertId;
  }
}
