import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { ShopComponent } from './shop.component';

@NgModule({
  declarations: [ShopComponent],
  exports: [ShopComponent],
  imports: [CommonModule, CoreModule],
})
export class ShopModule {}
