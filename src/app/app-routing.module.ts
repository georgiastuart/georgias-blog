import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogPostComponent } from './blog-post/blog-post.component';
import {BlogComponent} from './blog/blog.component';
import {BlogHomeComponent} from './blog-home/blog-home.component';

const routes: Routes = [
  {
    path: 'blog',
    component: BlogComponent,
    children: [
      {
        path: '',
        component: BlogHomeComponent
      },
      {
        path: ':year/:month/:day/:slug',
        component: BlogPostComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
