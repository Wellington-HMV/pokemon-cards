import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { CardsComponent } from './cards.component';
import { CardsDialogComponent } from './cards-dialog/cards-dialog.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CardsComponent, CardsDialogComponent],
  exports: [CardsComponent, CardsDialogComponent],
  imports: [CommonModule, CoreModule, MaterialModule, NgbTooltipModule],
})
export class CardsModule {}
