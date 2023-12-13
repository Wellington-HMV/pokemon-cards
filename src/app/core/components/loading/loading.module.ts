import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingCenterComponent } from './loading-center/loading-center.component';
import { LoadingFullComponent } from './loading-full/loading-full.component';



@NgModule({
  declarations: [
    LoadingCenterComponent,
    LoadingFullComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingCenterComponent,
    LoadingFullComponent
  ]
})
export class LoadingModule { }
