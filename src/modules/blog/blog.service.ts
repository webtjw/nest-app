import { Injectable } from "@nestjs/common";
import { UrlQuery } from "./dto/query.dto";

@Injectable()
export class BlogService {
  getName() {
    return 'BlogService'
  }
  stringifyObject(query: Array<any>): string {
    console.log(query)
    return query.join('-');
  }
}
