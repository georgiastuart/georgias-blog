import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ArticleService, ArticleInfo } from '../article.service';
import * as moment from 'moment';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
  article: ArticleInfo;
  url: string;
  moment = moment;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    this.getArticle();
  }

  getArticle(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.article = this.articleService.lookupArticle(slug);
    this.url = '/assets/blog/' + this.article.url + '/' + slug + '.md';

  }
}
