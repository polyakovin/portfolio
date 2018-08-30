import { Injectable, EventEmitter } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class CommonService {
  lang = "en"; // ru, en

  constructor(
    private http: HttpService
  ) {
    this.http.get("http://ip-api.com/json").subscribe(
      res => this.lang = res.countryCode.toLowerCase() === 'ru' ? 'ru' : 'en',
      error => console.error(error)
    );
  }
}
