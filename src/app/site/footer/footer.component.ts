import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
  selector: 'na-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  links = [];

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.get("assets/data/links.json").subscribe(
      data => this.links = data,
      error => console.log(error)
    );
  }

}
