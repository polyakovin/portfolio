import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'na-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
  isContactsCardShown = false;
  links = [];

  constructor(
    private http: HttpService,
    public common: CommonService
  ) { }

  ngOnInit() {
    this.http.get("assets/data/links.json").subscribe(
      data => this.links = data,
      error => console.log(error)
    );

    // console.log();
  }

  toggleLanguage() {
    if (this.common.lang === 'ru') {
      this.common.lang = 'en';
    } else {
      this.common.lang = 'ru';
    }
  }
}