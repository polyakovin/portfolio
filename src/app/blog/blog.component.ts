import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import articles from '../../assets/data/articles.json';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  articles = articles;
  article = '';
  isModalShown = false;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}

  openArticle(event, article) {
    event.preventDefault();
    this.article = article;
    this.isModalShown = true;
  }

  backToSite() {
    this.router.navigate(['/']);
  }
}
