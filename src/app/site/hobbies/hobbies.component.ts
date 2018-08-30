import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { CommonService } from '../../common.service';

@Component({
  selector: 'na-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrls: ['./hobbies.component.scss']
})
export class HobbiesComponent implements OnInit {
  hobbies = [];
  title = {"ru": "Увлечения", "en": "Hobbies"};

  constructor(
    private http: HttpService,
    public common: CommonService
  ) {}

  ngOnInit() {
    this.http.get("assets/data/hobbies.json").subscribe(
      data => this.hobbies = data,
      error => console.log(error)
    );
  }
}
