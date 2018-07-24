import { Controller, Get, UsePipes, ParseIntPipe, Query } from "@nestjs/common";
import { BlogService } from "./blog.service";
import { UrlQuery } from "./dto/query.dto";
import { DemoPipe } from "./pipes/demo.pipe";

@Controller('/blogApi')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('/index')
  @UsePipes(DemoPipe)
  getIndexArticles(@Query() query: Array<any>) {
    return this.blogService.stringifyObject(query);
  }
}