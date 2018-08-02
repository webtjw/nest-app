import { Controller, Get, Param, Post, Body, Res } from "@nestjs/common";
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
    const res: WebApiResponse = await this.blogService.getArticleDetail(id as number);
    return res;
  }

  @Post('/getArchive')
  async getArchive(@Body() data): Promise<WebApiResponse> {
    const {index, size} = data;
    const res: WebApiResponse = await this.blogService.getArchive(index as number, size as number);
    return res;
  }

  @Get('/allTags')
  async getAllTags(): Promise<WebApiResponse> {
    const res: WebApiResponse = await this.blogService.getAllTags();
    return res;
  }

  @Post('/getArticleByTag')
  async getArticleByTag(@Body() body): Promise<WebApiResponse> {
    const {tag, pageIndex} = body;
    const res: WebApiResponse = await this.blogService.getArticleByTag(tag as string, pageIndex as number);
    return res;
  }

  @Post('/login')
  async login(@Body() body, @Res() res): Promise<void> {
    const {token} = body;
    const [name, md5]: string[] = await this.blogService.login(token as string);
    res.cookie('authentication', md5, {
      maxAge: 3600000 * 24,
      httpOnly: true
    });
    res.append('Access-Control-Allow-Credentials', true);
    res.send(new WebApiResponse(true, '', name)); // 使用了 res 即特定库方式
  }

  @Post('/save')
  async saveArticle(@Body() body): Promise<WebApiResponse> {
    const {code, antecedent, tags, title, id} = body;
    const articleId = await this.blogService.saveArticle(id, title, tags, antecedent, code);
    return new WebApiResponse(true, '', {id: articleId});
  }
}