import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { CommonService } from '../../common.service';

@Component({
  selector: 'na-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  constructor(
    private http: HttpService,
    public common: CommonService
  ) {}

  ngOnInit() {
    if (this.common.links.length === 0) this.http.get("assets/data/links.json").subscribe(
      data => this.common.links = data,
      error => console.error(error)
    );
  }
}
