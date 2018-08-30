import { CommonService } from '../../common.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'na-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  name = {"ru": "Игорь Поляков", "en": "Igor Polyakov"};
  usp = {"ru": "Создаю веб-платформы любой сложности.", "en": "Creates web-platforms of any complexity."};

  constructor(
    public router: Router,
    public common: CommonService
  ) {}

  ngOnInit() {
  }
}
