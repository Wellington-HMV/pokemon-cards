import { Injectable } from '@angular/core';

export interface ToastInfo {
  header: string;
  body: string;
  type: string;
  delay?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: ToastInfo[] = [];

  show(
    type: 'success' | 'danger' | 'info' | '',
    header: string,
    body: string,
    delay?: number
  ) {
    const localSetShow = localStorage.getItem(header);
    if (!Boolean(localSetShow)) {
      this.toasts.push({ type, header, body, delay });
    }
  }

  remove(toast: ToastInfo) {
    this.toasts = this.toasts.filter((t) => t != toast);
  }

  constructor() {}
}
