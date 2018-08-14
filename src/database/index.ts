import { database } from "./database";
import { DatabaseQueryResult } from "./database.dto";

const getIndexArticles = async function(size: number): Promise<DatabaseQueryResult> {
  return database.sql(`select id,title,tags,time,description,codeText from article order by time desc limit ${size}`);
}

const getArticleDetail = async function(id: number): Promise<DatabaseQueryResult> {
  return database.sql(`select * from article where id=${id}`);
}

const getArticleArchive = async function(index: number, size: number): Promise<DatabaseQueryResult> {
  return database.sql(`select id,title,tags,time from article order by time desc limit ${size * index},${size * (index + 1)}`);
}

const getAllTags = async function(): Promise<DatabaseQueryResult> {
  return database.sql(`select * from tags`);
}

const getArticleByTag = async function(tag: string, pageIndex: number, size: number): Promise<DatabaseQueryResult> {
  return database.sql(`select id,title,tags,time from article where tags like '%${tag}%' order by time desc limit ${size * pageIndex},${size * (pageIndex + 1)}`);
}

const login = async function(token: string): Promise<DatabaseQueryResult> {
  return database.sql(`select * from developer where token='${token}'`);
}

const saveEditArticle = async function(id: number, title: string, tags: string, antecedent: string, code: string): Promise<DatabaseQueryResult> {
  const des_decode = antecedent.replace(/'/g, '\\\'').replace(/\\/g, '\\\\');
  const code_decode = code.replace(/'/g, '\\\'').replace(/\\/g, '\\\\');

  const result = await database.sql(`update article set title='${title}',tags='${tags}',codeText='${code_decode}',description='${des_decode}' where id=${id}`);
  return result.success ? new DatabaseQueryResult(true, id) : result;
}

const saveNewArticle = async function(title: string, tags: string, time: string, antecedent: string, code: string): Promise<DatabaseQueryResult> {
  const des_decode = antecedent.replace(/'/g, '\\\'').replace(/\\/g, '\\\\');
  const code_decode = code.replace(/'/g, '\\\'').replace(/\\/g, '\\\\');

  const result = await database.sql(`insert into article (title,tags,time,description,codeText) values ('${title}','${tags}','${time}','${des_decode}','${code_decode}')`);
  return result.success ? new DatabaseQueryResult(true, result.data.insertId) : result;
}

const addTagItem = async (tagName: String): Promise<DatabaseQueryResult> => {
  console.log(`addTagItem ${tagName}`)
  const result = await database.sql(`INSERT INTO tags (name, number) VALUES ('${tagName}', 1)`);
  return result;
}

const updateTagItem = async (tagName: String, num: number): Promise<DatabaseQueryResult> => {
  console.log(`updateTagItem ${tagName} ${num}`)
  const result = await database.sql(`UPDATE tags SET number = ${num} WHERE name='${tagName}'`);
  return result;
}

export default {
  getIndexArticles,
  getArticleDetail,
  getArticleArchive,
  getAllTags,
  getArticleByTag,
  login,
  saveEditArticle,
  saveNewArticle,
  addTagItem,
  updateTagItem
}