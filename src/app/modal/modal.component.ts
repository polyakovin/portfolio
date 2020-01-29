import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() project: any = {};
  @Input() isShown = false;
  @Output() modalClosed = new EventEmitter();

  constructor(
    public common: CommonService
  ) {}

  ngOnInit() {}

  closeModal() {
    this.modalClosed.emit();
  }
}
