import { Component, OnInit } from '@angular/core';

interface Course {
  name: string;
  routerLink?: string;
}

@Component({
  selector: 'app-teaching',
  templateUrl: './teaching.component.html',
  styleUrls: ['./teaching.component.scss']
})
export class TeachingComponent implements OnInit {

  coursesTaught: Course[] = [
    {name: 'Problems Using Mathematical Modeling'}, {name: 'Statistics for Science and Mathematics Education'},
    {name: 'Introduction to Computer Science for Science and Mathematics Teachers (1 and 2)'},
    {name: 'Problems Using Discrete Mathematics'}, {name: 'Problems Using Probability and Statistics'},
    {name: 'Problems Using Geometry'}, {name: 'Non-Euclidean Geometry for Teachers'},
    {name: 'Higher Geometry for Teachers'}];
  coursebookUrl = 'https://coursebook.utdallas.edu/georgia/stuart/term_all/includeindstudy_1?';
  constructor() { }

  ngOnInit() {
  }

}
