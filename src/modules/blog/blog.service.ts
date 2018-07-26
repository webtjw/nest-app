import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { database } from "database";
import { indexArticleMaxNum } from "config";
import { IndexArticleItem } from "./dto/ajax.dto";

@Injectable()
export class BlogService {
  // 获取首页文章
  async getIndexArticleList(): Promise<Array<any>> {
    const size = indexArticleMaxNum;
    const {success, data} = await database.sql(`select id,title,tags,time,description,codeText from article order by time desc limit ${size}`);

    if (!success) throw new HttpException(`数据库错误: ${data}`, HttpStatus.SERVICE_UNAVAILABLE);
    
    return (data as Array<any>).map(item => {
      const {id, title, tags, time, description, codeText} = item;
      return new IndexArticleItem(id, title, tags.split(','), time, description || codeText)
    })
  }
}
