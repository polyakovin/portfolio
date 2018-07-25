import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class CommonService {

  constructor() { }

  roleChanged = new EventEmitter();

  prideHovered(i) {
    this.roleChanged.emit(i);
  }
}
