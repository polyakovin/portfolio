import { CommonService } from '../../common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'na-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  name = {"ru": "Игорь Поляков", "en": "Igor Polyakov"};
  usp = {"ru": "Создаю веб-платформы любой сложности.", "en": "Creates web-platforms of any complexity."};

  constructor(
    public common: CommonService
  ) {}

  ngOnInit() {
  }
}
