import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  template: '<router-outlet></router-outlet>',
})
export class PagesComponent {
  constructor(private router: Router) {
    this.router.navigate(['/decks']);
  }
}
