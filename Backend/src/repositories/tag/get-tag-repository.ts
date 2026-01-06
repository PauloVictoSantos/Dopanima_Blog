import { db } from "../../database/db";
import { Tag } from "../../models/Tag";

export class GetTagRepository {
  async findAll(): Promise<Tag[]> {
    const [rows] = await db.execute("SELECT * FROM tags");
    return rows as Tag[];
  }

  async findById(id: number): Promise<Tag | null> {
    const [rows] = await db.execute("SELECT * FROM tags WHERE id = ?", [id]);

    const tags = rows as Tag[];
    return tags.length ? tags[0] : null;
  }
}
