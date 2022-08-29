import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';
import companies from '../../../assets/data/companies.json';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  title = {
    ru: 'Компании, с которыми работал',
    en: 'Companies I worked with',
  };
  companies = companies;
  constructor(
    public common: CommonService,
  ) {}
  ngOnInit() {}
}
