import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class CommonService {
  lang;

  constructor(
    private http: HttpService
  ) {
    this.getCountryCode();
  }

  getCountryCode() {
    if (!this.lang) {
      this.lang = 'en'; // ru, en
      this.http.get('https://ipapi.co/json').subscribe(
        res => this.lang = res.country_code.toLowerCase() === 'ru' ? 'ru' : 'en'
      );
    }
  }
}
