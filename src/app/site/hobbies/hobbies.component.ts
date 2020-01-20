import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrls: ['./hobbies.component.scss']
})
export class HobbiesComponent implements OnInit {
  title = {'ru': 'Увлечения', 'en': 'Hobbies'};

  constructor(
    private http: HttpService,
    public common: CommonService
  ) {}

  ngOnInit() {
    if (this.common.hobbies.length === 0) {
      this.http.get('assets/data/hobbies.json').subscribe(
        data => this.common.hobbies = data,
        error => console.error(error)
      );
    }
  }
}
