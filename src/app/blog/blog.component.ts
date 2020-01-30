import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import categories from '../../assets/data/articles.json';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  categories = categories;
  article = '';
  isModalShown = false;
  knownPlatforms = ['vk', 'github'];

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

  isKnownPlatform(platform) {
    return this.knownPlatforms.indexOf(platform) !== -1;
  }
}
