import { database } from "./database";
import { DatabaseQueryResult } from "./database.dto";

export async function getIndexArticles(size: Number): Promise<DatabaseQueryResult> {
  return database.sql(`select id,title,tags,time,description,codeText from article order by time desc limit ${size}`);
}

export async function getArticleDetail(id: Number): Promise<DatabaseQueryResult> {
  return database.sql(`select * from article where id=${id}`);
}

export async function getArticleArchive(index: number, size: number): Promise<DatabaseQueryResult> {
  return database.sql(`select id,title,tags,time from article order by time desc limit ${size * index},${size * (index + 1)}`);
}
