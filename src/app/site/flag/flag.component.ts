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

  ngOnInit() {
  }

  toggleLanguage() {
    if (this.common.lang === 'ru') {
      this.common.lang = 'en';
    } else {
      this.common.lang = 'ru';
    }
  }
}
