import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { Observable, throwError } from 'rxjs';
import {map} from 'rxjs/operators';

export interface ArticleInfo {
  title: string;
  date: Date;
  slug: string;
  tags: string[];
  url: string;
  text: string;
  excerpt: string;
}

const ARTICLES: ArticleInfo[] = [
  {
    title: 'This is a Test Blog Post',
    date: new Date('2019-03-18T16:23:45+0000'),
    tags: ['test', 'post'],
    slug: 'this-is-a-test',
    url: '2019/03/17',
    text: '',
    excerpt: ''
  }
];

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public readonly articleFrontmatter: ArticleInfo[];
  constructor(
    private http: HttpClient
  ) {
    this.articleFrontmatter = ARTICLES;
  }

  lookupArticle(slug: string): Observable<ArticleInfo> {
    const article =  _.find(this.articleFrontmatter, (val: ArticleInfo) => val.slug === slug);

    if (!article) {
      return throwError('Article ' + slug + ' not found.');
    }
    return this.http.get('/assets/blog/' + article.url + '/' + slug + '.md', {responseType: 'text'})
      .pipe(map((md: string) => {
        article.text = md;
        article.excerpt = md.split('<!--more-->')[0];
        return article;
      }));
  }
}
