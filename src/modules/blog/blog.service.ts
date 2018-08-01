import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { indexArticleMaxNum } from "config";
import { IndexArticleItem } from "./dto/ajax.dto";
import { getIndexArticles, getArticleDetail, getArticleArchive } from "database";
import { WebApiResponse } from "dto/common.dto";


@Injectable()
export class BlogService {
  // 获取首页文章
  async getIndexArticleList(): Promise<WebApiResponse> {
    const size = indexArticleMaxNum;
    const {success, data} = await getIndexArticles(size);

    if (!success) return new WebApiResponse(false, data as String, null);
    else {
      const formatData = (data as Array<any>).map(item => {
        const {id, title, tags, time, description, codeText} = item;
        return new IndexArticleItem(id, title, tags.split(','), time, description || codeText);
      })
      
      return new WebApiResponse(true, '', formatData);
    }
  }
  // 文章详细
  async getArticleDetail(id: Number): Promise<WebApiResponse> {
    const {success, data} = await getArticleDetail(id);
    if (!success) return new WebApiResponse(false, data as String, null);
    else {
      const article = (data as Array<any>)[0];
      article.tags = article.tags.split(',');
      return new WebApiResponse(true, '', article);
    }
  }
  // 文章归档
  async getArchive(index: number, size: number): Promise<WebApiResponse> {
    const {success, data} = await getArticleArchive(index, size);
    if (!success) return new WebApiResponse(false, data as String, null);
    else {
      // per month
      const monthList = [];
      let currentMonth = {month: '', list: []};

      (data as Array<any>).forEach(item => {
        item.tags = item.tags.split(',')

        const itemMonth = item.time.slice(0, item.time.lastIndexOf('-'))
        if (currentMonth.month === itemMonth) currentMonth.list.push(item)
        else {
          currentMonth = {month: itemMonth, list: [item]}
          monthList.push(currentMonth)
        }
      })
      return new WebApiResponse(true, '', monthList);
    }
  }
}
