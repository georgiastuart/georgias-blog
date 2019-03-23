import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { Observable, throwError } from 'rxjs';
import {map} from 'rxjs/operators';

declare var require;

export interface ArticleInfo {
  title: string;
  dateCreated: string;
  slug: string;
  tags: string[];
  url: string;
  text: string;
  excerpt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public readonly articleFrontmatter: ArticleInfo[];
  articles: ArticleInfo[];

  constructor(
    private http: HttpClient
  ) {
    this.articles = require('../assets/blog/blog-list.json').posts;
    // console.log(this.articles);
    this.articleFrontmatter = this.articles;
  }

  lookupArticle(slug: string): Observable<ArticleInfo> {
    const article: ArticleInfo =  _.find(this.articleFrontmatter, (val: ArticleInfo) => val.slug === slug);

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
