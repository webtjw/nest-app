import { database } from "./database";
import { DatabaseQueryResult } from "./database.dto";

export async function getIndexArticles(size: Number): Promise<DatabaseQueryResult> {
  return database.sql(`select id,title,tags,time,description,codeText from article order by time desc limit ${size}`);
}
