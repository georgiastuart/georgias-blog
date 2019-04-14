import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../environments/environment';
import * as _ from 'lodash';
import {combineLatest, forkJoin, Observable, of, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {ParamMap} from '@angular/router';

declare var require;

export interface ArticleInfo {
  title: string;
  createdAt: Date;
  publishedAt: Date;
  draft: boolean;
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
  allArticles: ArticleInfo[];
  articles: ArticleInfo[];
  tags: object;

  constructor(
    private http: HttpClient
  ) {
    this.allArticles = require('../assets/blog/blog-list.json');
    this.tags = require('../assets/blog/tag-list.json');

    if (environment.production) {
      this.articles  = this.allArticles.filter((article: ArticleInfo) => !article.draft);
    } else {
      this.articles = this.allArticles;
      console.log(this.articles);
    }

    this.articles.reverse();
    // console.log(this.articles);
    this.articleFrontmatter = this.articles;
    this.articles.forEach((article: ArticleInfo) => {
      article.createdAt = new Date(article.createdAt);
      article.publishedAt = new Date(article.publishedAt);
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
        article.text = md.split('----------')[1];
        return article;
      }));
  }

  filterByTag(articleList: ArticleInfo[], tagList: string[]): ArticleInfo[] {
    return articleList.filter((article: ArticleInfo) => tagList.every((tag: string) => article.tags.includes(tag)));
  }

  filterByYear(articleList: ArticleInfo[], year: number): ArticleInfo[] {
    return articleList.filter((article: ArticleInfo) => article.publishedAt.getFullYear() === year);
  }

  filterArticles(queryParamMap: ParamMap): ArticleInfo[] {

    const tagString = queryParamMap.get('tags') || '';
    let filterTags: string[];
    if (tagString.length > 0) {
      filterTags = tagString.split(',');
    } else {
      filterTags = [];
    }
    let tempList = this.filterByTag(this.articles, filterTags);

    const year = +queryParamMap.get('year');
    console.log(year);
    if (year > 0) {
      tempList = this.filterByYear(tempList, year);
    }

    return tempList;
  }

  lookupArticleListByYear(year: number): ArticleInfo[] {
    return this.articles.filter((article: ArticleInfo) => article.publishedAt.getFullYear() === year);
  }
}
