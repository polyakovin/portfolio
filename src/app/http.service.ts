import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface IIpResponse {
  countryCode: string;
}

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  get(url) {
    return this.http.get<any>(url);
  }

  getText(url) {
    return this.http.get<string>(url, { responseType: 'text' as 'json' });
  }

  post(data: any, url: string) {
    const body = JSON.stringify(data);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(url, body, {
      headers: headers
    });
  }

  // getL11N() {
  //   const ipAPIurl = 'http://ip-api.com/json';
  //   return this.http.get(ipAPIurl)
  //     .pipe(map((response: HttpResponse<IIpResponse>) => response.countryCode === 'ru' ? 'ru' : 'en'));
  // }
}
