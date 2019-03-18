import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxMdModule } from 'ngx-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BlogPostComponent } from './blog-post/blog-post.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BlogPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMdModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
