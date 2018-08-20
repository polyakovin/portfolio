import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'na-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
  isContactsCardShown = false;
  links = [];

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.get("assets/data/links.json").subscribe(
      data => this.links = data,
      error => console.log(error)
    );
  }
}