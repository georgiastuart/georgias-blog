import { Component, OnInit } from '@angular/core';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  faGraduationCap = faGraduationCap;
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  faTwitter = faTwitter;

  constructor() { }

  ngOnInit() {
  }

}
