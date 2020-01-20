import { CommonService } from '../../common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  name = {'ru': 'Игорь Поляков', 'en': 'Igor Polyakov'};
  usp = {'ru': 'Создаю веб и мобильные платформы любой сложности', 'en': 'I create web and mobile apps of any complexity'};

  constructor(
    public common: CommonService
  ) {}

  ngOnInit() {
  }
}
