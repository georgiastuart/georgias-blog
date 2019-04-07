import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  activeTags: string[];
  tags: object;
  errorMsg: string;
  loading: boolean;
  showFilter: boolean;
  Object: object;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
      this.errorMsg = '';
      this.articles = this.articleService.filterArticles(paramMap);
      this.activeTags = (paramMap.get('tags') || '').split(',');
      if (this.articles.length === 0) {
        this.errorMsg = 'No Articles Found';
      }
    }, (error) => {
      this.errorMsg = 'Whaaaat' + error;
    });
  }

  getTagList(): (string|number)[][] {
    const tagArray = Object.entries(this.tags);
    tagArray.sort((tag1, tag2) => {
      return tag1[0].toLocaleUpperCase().localeCompare(tag2[0].toLocaleUpperCase());
    });
    return tagArray;
  }

  filterByTag(tag: string): void {
    // const tagString = this.route.snapshot.queryParamMap.get('tags') || '';
    // const tagList = tagString.split(',');

    if (this.activeTags.includes(tag)) {
      this.router.navigate(
        [],
        {
          relativeTo: this.route,
          queryParams: {tags: this.activeTags.filter(value => value !== tag).join(',') || null},
          queryParamsHandling: 'merge'
        }
      );
    } else {
      let tempTagList: string[];
      if ((this.activeTags.length === 1) && this.activeTags[0] === '') {
        tempTagList = [tag];
      } else {
        tempTagList = this.activeTags.concat(tag);
      }
      this.router.navigate(
        [],
        {
          relativeTo: this.route,
          queryParams: {tags: tempTagList.join(',')},
          queryParamsHandling: 'merge'
        }
      );
    }
  }

  tagIsActive(tag: string): boolean {
    return this.activeTags.includes(tag);
  }

}
