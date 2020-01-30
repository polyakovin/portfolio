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
export class ArticleComponent implements OnInit, OnChanges {
  @Input('article') article;
  articleHTML;
  currentSpinner;
  spinners = [
    'cog',
    'sun',
    'certificate',
    'snowflake',
    'compass',
    'crosshairs',
    'atom',
    'asterisk',
    'compact-disc',
    'life-ring',
    'circle-notch',
    'sync-alt',
    'sticker-mule',
  ];

  constructor(
    private http: HttpService,
  ) {}

  ngOnInit() {}

  ngOnChanges() {
    this.currentSpinner = this.getOneOfTheSpinners();
    this.articleHTML = '';
    this.http.getText(this.article.href).subscribe(markdown => {
      this.articleHTML = converter.makeHtml(markdown);
    });
  }

  getOneOfTheSpinners() {
    const randomIndex = Math.floor(Math.random() * this.spinners.length);
    return this.spinners[randomIndex];
  }
}
