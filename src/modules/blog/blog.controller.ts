import { Controller, Get } from "@nestjs/common";
import { BlogService } from "./blog.service";
import { IndexArticleItem } from "./dto/ajax.dto";

@Controller('/blogApi')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('/index')
  async getIndexArticles(): Promise<Array<IndexArticleItem>> {
    const articles: Array<IndexArticleItem> = await this.blogService.getIndexArticleList();
    return articles;
  }
}