import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ArticleService, ArticleInfo } from '../article.service';
import * as moment from 'moment';
import * as marked from 'marked';
import 'prismjs/components/prism-python';
import {Title} from '@angular/platform-browser';
declare var require;

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
  article: ArticleInfo;
  url: string;
  loading: boolean;
  errorMsg: string;
  error: boolean;

  moment = moment;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private articleService: ArticleService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.getArticle();
  }

  getArticle() {
    this.loading = true;
    const slug = this.route.snapshot.paramMap.get('slug');
    this.articleService.lookupArticle(slug).subscribe(
      (article: ArticleInfo) => {
        this.article = article;
        this.loading = false;
        this.titleService.setTitle('Georgia\'s Blog: ' + article.title);
        console.log(this.article.createdAt);
      }, (error) => {
        this.errorMsg = 'Error finding article ' + slug;
        this.loading = false;
        this.error = true;
        this.titleService.setTitle('Article Not Found');

      }
    );
    // this.url = '/assets/blog/' + this.article.url + '/' + slug + '.md';
  }
}
