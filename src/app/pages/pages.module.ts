import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { CardsModule } from './cards/cards.module';
import { DecksModule } from './decks/decks.module';
import { HomeModule } from './home/card.module';
import { ProfileModule } from './profile/profile.module';
import { ShopModule } from './shop/shop.module';

@NgModule({
  declarations: [PagesComponent],
  exports: [PagesComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CardsModule,
    DecksModule,
    HomeModule,
    ProfileModule,
    ShopModule,
  ],
})
export class PagesModule {}
