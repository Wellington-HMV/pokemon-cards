import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { CardsComponent } from './cards/cards.component';
import { HomeComponent } from './home/home.component';
import { DecksComponent } from './decks/decks.component';
import { ProfileComponent } from './profile/profile.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [],
    component: PagesComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'cards/:id', component: CardsComponent,  },
      { path: 'decks', component: DecksComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'shop', component: ShopComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
