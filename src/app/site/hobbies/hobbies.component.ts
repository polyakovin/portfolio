import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { shuffle } from 'lodash';
import { CommonService } from '../../common.service';
import hobbies from './hobbies';

@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrls: ['./hobbies.component.scss']
})
export class HobbiesComponent implements OnInit {
  title = {
    ru: 'Увлечения',
    en: 'Hobbies',
  };
  hobbies = shuffle(hobbies);

  constructor(
    public common: CommonService,
    private router: Router,
  ) {}

  ngOnInit() {}

  navigate(event, route) {
    event.preventDefault();
    this.router.navigate([route]);
  }
}
