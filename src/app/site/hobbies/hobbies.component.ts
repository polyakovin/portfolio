import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';
import hobbies from '../../../assets/data/hobbies.json';

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
  hobbies = hobbies;

  constructor(
    public common: CommonService,
  ) {}

  ngOnInit() {}
}
