import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  constructor(private router: Router){
    setTimeout(() => {
      this.router.navigate(['decks'])
    }, 2000);
  }
}
