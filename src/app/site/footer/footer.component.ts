import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';
import links from '../../../assets/data/links.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  title = {
    ru: 'Свяжитесь со мной!',
    en: 'Get in Touch with Me!',
  };
  links = links;

  constructor(
    public common: CommonService,
  ) {}

  ngOnInit() {}
}
