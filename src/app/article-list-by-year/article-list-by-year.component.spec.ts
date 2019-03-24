import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleListByYearComponent } from './article-list-by-year.component';

describe('ArticleListByYearComponent', () => {
  let component: ArticleListByYearComponent;
  let fixture: ComponentFixture<ArticleListByYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleListByYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleListByYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
