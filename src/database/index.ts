import { database } from "./intialization";

export async function getIndexArticles(size: Number) {
  const resu = await database.sql(`select id,title,tags,time,description,codeText from article order by time desc limit ${size}`);
  
  // if (err) resolve(new ReturnServiceObject(false, (err || '未知的错误发生了').toString()))
  // else resolve(new ReturnServiceObject(true, result))

}