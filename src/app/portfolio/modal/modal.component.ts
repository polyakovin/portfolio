import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() project: any = {};

  constructor(
    public common: CommonService
  ) {}

  ngOnInit() {}
}
