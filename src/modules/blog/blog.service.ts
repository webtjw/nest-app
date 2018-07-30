import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { indexArticleMaxNum } from "config";
import { IndexArticleItem } from "./dto/ajax.dto";
import { getIndexArticles } from "database";


@Injectable()
export class BlogService {
  // 获取首页文章
  async getIndexArticleList(): Promise<Array<IndexArticleItem>> {
    const size = indexArticleMaxNum;
    const {success, data} = await getIndexArticles(size);

    if (!success) throw new HttpException(`数据库错误: ${data}`, HttpStatus.SERVICE_UNAVAILABLE);

    const formatData = (data as Array<any>).map(item => {
      const {id, title, tags, time, description, codeText} = item;
      return new IndexArticleItem(id, title, tags.split(','), time, description || codeText);
    })
    
    return formatData
  }
}
