import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

export interface IDropDown {
  icon: string;
  options: [
    {
      url?: string;
      name: string;
      type: 'accept' | 'cancel' | 'option';
    }
  ];
}

@Component({
  selector: 'app-dropdown-btn',
  templateUrl: './dropdown-btn.component.html',
  styleUrls: ['./dropdown-btn.component.scss'],
})
export class DropdownBtnComponent {
  @Input() config: IDropDown;
  @Output() selected = new EventEmitter();
  open = false;

  constructor(private router: Router) {}

  onClick(selected) {
    if (selected.type === 'option') this.selected.emit(selected);
    if (selected.type === 'cancel') this.selected.emit(false);
    if (selected.type === 'accept') {
      this.selected.emit(true);
      if (selected.url) this.router.navigate([`/${selected.url}`]);
    }
  }
}
