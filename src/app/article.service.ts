import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as _ from 'lodash';
import {combineLatest, forkJoin, Observable, of, throwError} from 'rxjs';
import {map} from 'rxjs/operators';

declare var require;

export interface ArticleInfo {
  title: string;
  dateCreated: Date;
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
    this.articles = require('../assets/blog-list.json').posts;
    // console.log(this.articles);
    this.articleFrontmatter = this.articles;
    this.articles.forEach((article: ArticleInfo) => {
      article.dateCreated = new Date(article.dateCreated);
      article.excerpt = '';
      article.text = '';
    });
  }

  lookupArticle(slug: string): Observable<ArticleInfo> {
    const article: ArticleInfo = _.find(this.articleFrontmatter, (val: ArticleInfo) => val.slug === slug);

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

  lookupArticleListByYear(year: number): ArticleInfo[] {
    return this.articles.filter((article: ArticleInfo) => article.dateCreated.getFullYear() === year);
  }

  getExcerpts(articles: ArticleInfo[]): Observable<ArticleInfo[]> {
    if (articles.length === 0) {
      return throwError('No Articles');
    }
    return combineLatest(articles.map((article: ArticleInfo): Observable<ArticleInfo> => {
      if (article.excerpt.length === 0) {
        return this.http.get('/assets/blog/' + article.url + '/' + article.slug + '.md', {responseType: 'text'})
          .pipe(map((md: string): ArticleInfo => {
            article.excerpt = md.split('<!--more-->')[0];
            return article;
          }));
      } else {
        return of(article);
      }
    }));
  }
}
