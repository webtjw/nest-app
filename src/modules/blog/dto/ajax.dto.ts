// 首页 文章项
export class IndexArticleItem {
  readonly id: number;
  readonly title: string;
  readonly tags: Array<string>;
  readonly time: string;
  readonly antecedent: string;

  constructor(id: number, title: string, tags: Array<string>, time: string, antecedent: string) {
    this.id = id;
    this.title = title;
    this.tags = tags;
    this.time = time;
    this.antecedent = antecedent;
  }
}
