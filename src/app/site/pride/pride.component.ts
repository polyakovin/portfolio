import { HttpService } from '../../http.service';
import { CommonService } from '../../common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'na-pride',
  templateUrl: './pride.component.html',
  styleUrls: ['./pride.component.scss']
})
export class PrideComponent implements OnInit {
  mainProjects = [];

  constructor(private http: HttpService, public common: CommonService) {}

  ngOnInit() {
    this.http.get("assets/data/mainProjects.json").subscribe(
      data => this.mainProjects = data,
      error => console.log(error)
    );
  }
}
