import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BlogPostComponent} from './blog-post/blog-post.component';

const routes: Routes = [
  {
    path: 'blog/:year/:month/:day/:slug',
    component: BlogPostComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
