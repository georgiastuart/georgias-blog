import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {fakeAsync} from '@angular/core/testing';


interface Publication {
  token: string;
  name: string;
  authors: string;
  year: number;
  journal?: string;
  volume?: number;
  pages?: string;
  file?: string;
  other?: string;
  conference?: string;
  location?: string;
  url?: string;
}

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss']
})
export class PublicationsComponent implements OnInit {
  papers: Publication[];
  presentations: Publication[];
  loading: boolean;
  error = false;
  errorMsg: string;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.loading = true;
    this.http.get('assets/cv/publications/publications.json')
      .subscribe((res: any) => {
        this.papers = res.papers.reverse();
        this.presentations = res.presentations.reverse();
        this.loading = false;
      }, (error) => {
        console.log(error);
        this.error = true;
      });
  }

}
