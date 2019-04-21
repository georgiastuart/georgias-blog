import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  picture = 'assets/images/georgia_about';

  constructor() { }

  ngOnInit() {
  }

}
