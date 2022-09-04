import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss']
})
export class FlagComponent implements OnInit {
  constructor(
    public common: CommonService
  ) {}

  get otherLanguage() {
    return this.common.lang === 'ru' ? 'en' : 'ru';
  }

  ngOnInit() {}

  toggleLanguage() {
    this.common.lang = this.otherLanguage;
  }
}
