import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  slug: string;

  moment = moment;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private articleService: ArticleService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.url = this.router.url;
    this.getArticle();
  }

  getArticle() {
    this.loading = true;
    this.articleService.lookupArticle(this.slug).subscribe(
      (article: ArticleInfo) => {
        this.article = article;
        this.loading = false;
        this.titleService.setTitle('Georgia\'s Blog: ' + article.title);
        console.log(this.article.createdAt);
      }, (error) => {
        this.errorMsg = 'Error finding article ' + this.slug;
        this.loading = false;
        this.error = true;
        this.titleService.setTitle('Article Not Found');

      }
    );
    // this.url = '/assets/blog/' + this.article.url + '/' + slug + '.md';
  }
}
