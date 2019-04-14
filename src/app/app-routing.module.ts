import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogPostComponent } from './blog-post/blog-post.component';
import {BlogComponent} from './blog/blog.component';
import {BlogHomeComponent} from './blog-home/blog-home.component';
import {ContactComponent} from './contact/contact.component';
import {CvComponent} from './cv/cv.component';
import {AboutComponent} from './about/about.component';
import {ArticleListByYearComponent} from './article-list-by-year/article-list-by-year.component';
import {DevelopmentGuard} from './development-guard.service';
import {PublicationsComponent} from './publications/publications.component';

const routes: Routes = [
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'about',
    component: CvComponent
  },
  {
    path: 'publications',
    component: PublicationsComponent
  },
  {
    path: 'blog',
    component: BlogComponent,
    canActivate: [DevelopmentGuard],
    children: [
      {
        path: '',
        component: BlogHomeComponent
      },
      {
        path: ':slug',
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
