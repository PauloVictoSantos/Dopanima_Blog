import { db } from "../../database/db";
import { Tag } from "../../models/Tag";
import { ResultSetHeader } from "mysql2";

export class CreateTagReposiory {
  async create(tag: Tag): Promise<number> {
    const [result] = await db.execute<ResultSetHeader>(
      `INSERT INTO tags 
      (name, slug) 
      VALUES (?, ?)`,
      [tag.name, tag.slug]
    );

    return result.insertId;
  }
}
