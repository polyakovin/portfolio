import { HttpService } from '../../http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'na-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrls: ['./hobbies.component.scss']
})
export class HobbiesComponent implements OnInit {
  hobbies = [];

  constructor(private http: HttpService) {}

  ngOnInit() {
    this.http.get("assets/data/hobbies.json").subscribe(
      data => this.hobbies = data,
      error => console.log(error)
    );
  }
}
