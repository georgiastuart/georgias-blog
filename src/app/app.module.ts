import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxMdModule } from 'ngx-md';
import { HttpClientModule } from '@angular/common/http';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { BlogHomeComponent } from './blog-home/blog-home.component';
import { BlogComponent } from './blog/blog.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { CvComponent } from './cv/cv.component';
import { AboutComponent } from './about/about.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleListByYearComponent } from './article-list-by-year/article-list-by-year.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BlogPostComponent,
    BlogHomeComponent,
    BlogComponent,
    FooterComponent,
    ContactComponent,
    CvComponent,
    AboutComponent,
    ArticleListComponent,
    ArticleListByYearComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMdModule,
    HttpClientModule,
    NgbCollapseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
