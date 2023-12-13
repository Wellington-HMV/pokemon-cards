import { Component, OnInit } from '@angular/core';
import { ToastInfo, ToastService } from './service/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  constructor(public toastService: ToastService) {}
  ngOnInit(): void {}

  notShowMore(toast: ToastInfo) {
    localStorage.setItem(toast.header, 'false');
    this.toastService.remove(toast);
  }
}
