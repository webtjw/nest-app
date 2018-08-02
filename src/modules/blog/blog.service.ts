import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { indexArticleMaxNum } from "config";
import { IndexArticleItem } from "./dto/ajax.dto";
import database from "database";
import { WebApiResponse } from "dto/common.dto";
const md5 = require('blueimp-md5');
const moment = require('moment');


@Injectable()
export class BlogService {
  // 获取首页文章
  async getIndexArticleList(): Promise<WebApiResponse> {
    const size = indexArticleMaxNum;
    const {success, data} = await database.getIndexArticles(size);

    if (!success) return new WebApiResponse(false, data as string, null);
    else {
      const formatData = (data as Array<any>).map(item => {
        const {id, title, tags, time, description, codeText} = item;
        return new IndexArticleItem(id, title, tags.split(','), time, description || codeText);
      })
      return new WebApiResponse(true, '', formatData);
    }
  }
  // 文章详细
  async getArticleDetail(id: number): Promise<WebApiResponse> {
    const {success, data} = await database.getArticleDetail(id);
    if (!success) return new WebApiResponse(false, data as string, null);
    else {
      const article = (data as Array<any>)[0];
      article.tags = article.tags.split(',');
      return new WebApiResponse(true, '', article);
    }
  }
  // 文章归档
  async getArchive(index: number, size: number): Promise<WebApiResponse> {
    const {success, data} = await database.getArticleArchive(index, size);
    if (!success) return new WebApiResponse(false, data as string, null);
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
  // 获取所有标签
  async getAllTags(): Promise<WebApiResponse> {
    const {success, data} = await database.getAllTags();
    if (!success) return new WebApiResponse(false, data as string, null);
    else return new WebApiResponse(true, '', data);
  }
  // 根据标签查询文章列表
  async getArticleByTag(tag: string, pageIndex: number): Promise<WebApiResponse> {
    const defaultSize = 10;
    const {success, data} = await database.getArticleByTag(tag, pageIndex, defaultSize);
    if (!success) return new WebApiResponse(false, data as string, null);
    else {
      (data as any[]).forEach(item => {
        item.tags = item.tags.split(',');
      });
      return new WebApiResponse(true, '', data);
    }
  }
  // 登录
  async login(token: string): Promise<string[]> {
    const {success, data} = await database.login(token);
    if (!success) throw new HttpException({}, HttpStatus.SERVICE_UNAVAILABLE);
    else {
      const name = data[0].name;
      return [name, (md5(name, '3efd5f16327ea4b31a47') as string)];
    }
  }
  // 新增 或 保存文章
  async saveArticle (id: number, title: string, tags: string[], antecedent: string, code: string): Promise<number> {
    const tagsManipulate = {};
    // tags 表增加量
    tags.forEach(item => {
      tagsManipulate[item] = 1
    });
    // 编辑
    if (id) {
      // 对比旧数据得出编辑后的标签增减量
      const prevArticle = await database.getArticleDetail(id);
      const prevTags: string[] = (<string>prevArticle.data[0].tags).split(',');
      prevTags.forEach(item => {
        if (tagsManipulate[item]) delete tagsManipulate[item]
        else tagsManipulate[item] = -1
      })
      // 更新 time id 外的字段
      const editSaveResult = await database.saveEditArticle(id, title, tags.toString(), antecedent, code);
      if (editSaveResult.success) return editSaveResult.data as number;
      else throw new HttpException(new WebApiResponse(false, editSaveResult.data, null), HttpStatus.SERVICE_UNAVAILABLE);
    } else {
      const addResult = await database.saveNewArticle(title, tags.toString(), moment().format('YYYY-MM-DD') as string, antecedent, code);
      if (addResult.success) return addResult.data as number;
      else throw new HttpException(new WebApiResponse(false, addResult.data, null), HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
}
