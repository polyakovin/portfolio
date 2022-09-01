import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';
import contacts from './contacts';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  title = {
    ru: 'Свяжитесь со мной!',
    en: 'Get in Touch with Me!',
  };
  contacts = contacts;

  constructor(
    public common: CommonService,
  ) {}

  ngOnInit() {}
}
