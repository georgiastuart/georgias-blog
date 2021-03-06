import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ArticleService, ArticleInfo} from '../article.service';
import {Title} from '@angular/platform-browser';
import {forkJoin, Observable} from 'rxjs';

@Component({
  selector: 'app-article-list-by-year',
  templateUrl: './article-list-by-year.component.html',
  styleUrls: ['./article-list-by-year.component.scss']
})

export class ArticleListByYearComponent implements OnInit {
  year: number;
  articles: ArticleInfo[];
  errorMsg: string;
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private articleService: ArticleService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.loading = false;
    this.year = +this.route.snapshot.paramMap.get('year');
    this.titleService.setTitle('Articles from ' + this.year);
    this.articles = this.articleService.lookupArticleListByYear(this.year);
    console.log(this.articles);
  }

}
