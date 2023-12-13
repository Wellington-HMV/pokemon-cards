import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  exports: [HomeComponent],
  imports: [CommonModule, CoreModule],
})
export class HomeModule {}
