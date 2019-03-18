import { Injectable } from '@angular/core';
import * as _ from 'lodash';

export interface ArticleInfo {
  title: string;
  date: Date;
  slug: string;
  tags: string[];
  url: string;
}

const ARTICLES: ArticleInfo[] = [
  {
    title: 'This is a Test Blog Post',
    date: new Date('2019-03-18T16:23:45+0000'),
    tags: ['test', 'post'],
    slug: 'this-is-a-test',
    url: '2019/03/17'
  }
];

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public readonly articleFrontmatter: ArticleInfo[];
  constructor() {
    this.articleFrontmatter = ARTICLES;
  }

  lookupArticle(slug: string) {
    return _.find(this.articleFrontmatter, (val: ArticleInfo) => val.slug === slug);
  }
}
