import { Controller, Get } from "@nestjs/common";
import { BlogService } from "./blog.service";

@Controller('/blogApi')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('/index')
  getIndexArticles() {
    return this.blogService.getName()
  }
}