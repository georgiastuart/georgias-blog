import {Component, Input, OnInit} from '@angular/core';
import {ArticleInfo} from '../article.service';
import * as moment from 'moment';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  @Input() articles: ArticleInfo[];
  @Input() loading: boolean;
  @Input() errorMsg: string;
  moment = moment;
  faSpinner = faSpinner;

  constructor() { }

  ngOnInit() {
    console.log(this.articles);
  }

}
