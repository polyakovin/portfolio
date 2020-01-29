import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Converter } from 'showdown';
import { HttpService } from '../../http.service';

const converter = new Converter({
  simplifiedAutoLink: true,
  openLinksInNewWindow: true,
  tables: true,
  tasklists: true,
  parseImgDimensions: true,
  strikethrough: true,
});

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnChanges {
  @Input('article') article;
  articleHTML;

  constructor(
    private http: HttpService,
  ) {}

  ngOnChanges() {
    this.articleHTML = '';
    this.http.getText(this.article.href).subscribe(markdown => {
      this.articleHTML = converter.makeHtml(markdown);
    });
  }
}
