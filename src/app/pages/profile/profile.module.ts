import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [ProfileComponent],
  exports: [ProfileComponent],
  imports: [CommonModule, CoreModule],
})
export class ProfileModule {}
