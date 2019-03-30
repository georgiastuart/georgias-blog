import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ArticleInfo, ArticleService} from '../article.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.scss']
})
export class BlogHomeComponent implements OnInit {

  articles: ArticleInfo[];
  tags: object;
  errorMsg: string;
  loading: boolean;
  showFilter: boolean;
  Object: object;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private articleService: ArticleService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.showFilter = false;
    this.loading = false;
    this.Object = Object;
    this.titleService.setTitle('Georgia\'s Blog');
    this.articles = this.articleService.articles;
    this.tags = this.articleService.tags;
    this.route.queryParamMap.subscribe((paramMap) => {
      this.articles = this.articleService.filterArticles(paramMap);
      if (this.articles.length === 0) {
        this.errorMsg = 'No Articles Found';
      }
    }, (error) => {
      this.errorMsg = 'No Articles Found';
    });
  }

  getTagList(): (string|number)[][] {
    let tagArray = Object.entries(this.tags);
    tagArray.sort((tag1, tag2) => {
      return tag1[0].toLocaleUpperCase().localeCompare(tag2[0].toLocaleUpperCase());
    });
    return tagArray;
  }

}
