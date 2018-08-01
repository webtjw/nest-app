import { Controller, Get, Param } from "@nestjs/common";
import { BlogService } from "./blog.service";
import { WebApiResponse } from "dto/common.dto";

@Controller('/blogApi/article')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('/index')
  async getIndexArticles(): Promise<WebApiResponse> {
    const res: WebApiResponse = await this.blogService.getIndexArticleList();
    return res;
  }

  @Get('/data/:id')
  async getArticleDetail(@Param() parmas): Promise<WebApiResponse> {
    const {id} = parmas;
    const res: WebApiResponse = await this.blogService.getArticleDetail(id as Number);
    return res;
  }
}