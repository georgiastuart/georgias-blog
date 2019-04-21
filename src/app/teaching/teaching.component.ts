import { Component, OnInit } from '@angular/core';

interface Course {
  name: string;
  routerLink?: string;
  description?: string;
}

@Component({
  selector: 'app-teaching',
  templateUrl: './teaching.component.html',
  styleUrls: ['./teaching.component.scss']
})
export class TeachingComponent implements OnInit {

  coursesTaught: Course[] = [
    {
      name: 'Problems Using Mathematical Modeling',
      description: 'Modeling topics for teachers. Aligned with (and extended from) the 8-12 TEKS for Math Modeling.'
    },
    {
      name: 'Statistics for Science and Mathematics Education',
      description: 'Statistical techniques for analyzing educational data. Aimed at educational practitioners.'
    },
    {
      name: 'Introduction to Computer Science for Science and Mathematics Teachers 1',
      description: 'Introduction to programming using Python. Topics include variables, conditionals, looping, lists, and functions.'
    },
    {
      name: 'Introduction to Computer Science for Science and Mathematics Teachers 2',
      description: 'Introduction to computer science for teachers. Specifically aimed at the TEXES 241 computer science certification' +
        'exam. Topics include recursion, arrays, interpreting pseudocode, data structures, and object oriented programming.'
    },
    {
      name: 'Introduction to Computer Science for Science and Mathematics Teachers Special Topics',
      description: 'Covers the special topics on the TEXES 241 computer science certification exam. Topics include robotics, ' +
        'digital forensics, game design, and discrete math.'
    },
    {name: 'Problems Using Discrete Mathematics'}, {name: 'Problems Using Probability and Statistics'},
    {name: 'Problems Using Geometry'}, {name: 'Non-Euclidean Geometry for Teachers'},
    {name: 'Higher Geometry for Teachers'}];
  coursebookUrl = 'https://coursebook.utdallas.edu/georgia/stuart/term_all/includeindstudy_1?';
  constructor() { }

  ngOnInit() {
  }

}
