import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('navbar') navbar: ElementRef;
  imgHeight = 160;
  navHeight = 0;
  isCollapsed = true;
  constructor() { }

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    if (window.pageYOffset > this.imgHeight) {
      this.navbar.nativeElement.classList.add('fixed-top', 'border-bottom');
      this.navHeight =  this.navbar.nativeElement.clientHeight + 16;
    } else {
      this.navHeight =  0;
      this.navbar.nativeElement.classList.remove('fixed-top', 'border-bottom');
    }
  }

}
